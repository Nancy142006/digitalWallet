const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Transaction = require("../models/TransactionSchema");

const router = express.Router();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Deposit Money API
router.post("/deposit", authenticateUser, async (req, res) => {
  try {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const user = await User.findById(req.userId);
    user.balance += amount;
    await user.save();

    await Transaction.create({
      senderId: req.userId,
      amount,
      type: "deposit",
    });

    res.json({ message: "Deposit successful", newbalance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Send Money API
router.post("/send-money", authenticateUser, async (req, res) => {
  try {
    const { email, amount } = req.body;
    if (amount <= 0) return res.status(400).json({ message: "Invalid amount" });

    const sender = await User.findById(req.userId);
    const receiver = await User.findOne({ email });

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });
    if (sender.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // Record transaction
    await Transaction.create({
      senderId: sender._id,
      recieverId: receiver._id,
      amount,
      type: "send",
    });

    res.json({
      success: true,
      message: "Money sent successfully",
      newbalance: sender.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get transaction history for logged-in user
router.get(
  "/transactions" /*(Endpoint)*/,
  authenticateUser /*(Middleware)*/,
  async (req, res) => {
    try {
      const userId = req.userId;

      // Fetching Transactions
      const transactions = await Transaction.find({
        $or /*(MongoDB query operator, 
        matches document satisfying at
         least one of the condition)*/: [
          { senderId: userId },
          { recieverId: userId },
        ],
      }) 

      // replaces the senderId and recieverId with actual user detail
        .populate("senderId", "name email")
        .populate("recieverId", "name email")
        .sort({ timestamp: -1 }); //sorts the transactions in descending order

      res.json(transactions); 
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
