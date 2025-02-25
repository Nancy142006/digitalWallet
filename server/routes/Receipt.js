const express = require("express");
const PDFDocument = require("pdfkit");
const Transaction = require("../models/TransactionSchema");
const User = require("../models/User");

const router = express.Router();

router.get("/receipt/:transactionId", async (req, res) => {
  try {
    const { transactionId } = req.params; /*contains route parameter*/

    // Fetch transaction details
    const transaction = await Transaction.findById(transactionId)
      .populate("senderId", "name email")
      .populate("recieverId", "name email");

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Create a PDF document
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="receipt_${transactionId}.pdf"`
    );

    doc.pipe(res);

    // Add receipt details
    doc.fontSize(20).text("Transaction Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Transaction ID: ${transaction._id}`);
    doc.text(
      `Sender: ${transaction.senderId?.name} (${transaction.senderId?.email})`
    );
    doc.text(
      `Receiver: ${transaction.recieverId?.name} (${transaction.recieverId?.email})`
    );
    doc.text(`Amount: $${transaction.amount}`);
    doc.text(`Type: ${transaction.type}`);
    doc.text(`Date & Time: ${transaction.timestamp.toLocaleString()}`);
    doc.moveDown();
    doc.text("Thank you for using Digital Wallet!", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating receipt:", error);
    res.status(500).json({ message: "Error generating receipt" });
  }
});

module.exports = router;
