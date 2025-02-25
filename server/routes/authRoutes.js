const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendWelcomeEmail = require("./emailServices");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    
    await sendWelcomeEmail(email, name);

    res.status(201).json({ message: "Signup successful. Please login." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // compare password
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "invalid password" });

    // generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login Successfull!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Dashboard Route (Protected)
// defines an HTTP GET route at the endpoint
// an asynchronous function because it interacts with a database and performs token verification, which are asynchronous operations.
router.get("/dashboard" /*endpoint*/, async (req, res) => {
  try {
    // Get token from request headers
    /* NOTE: splits the Authorization header string into an array based
        on the space " " and then retrieves the second part([1]index)*/
    const token =
      req.headers.authorization /*retrieves the authorization header*/
        ?./*ensures that if authorization is undefines or null it won't throw an error*/ split(
          " "
        )[1]; //extracts the token from bearer token
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(
      /*check if the token is valid*/ token,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // response handling
    res.json({
      user,
      balance: user.balance, // Placeholder balance, replace with actual balance from DB
    });
  } catch (error) {
    // error handling
    console.error("Error in Dashboard Route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    return res.status(200).json({
      message:
        "successfully found the user",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error });
  }
});

module.exports = router;
