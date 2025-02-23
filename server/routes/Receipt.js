// const express = require("express");
// const PDF = require("pdfkit");
// const User = require("../models/User")

// const router= express.Router();

// router.get("/generate", async(req,res)=>{
//     try{
//         const users= await User.find(); //Fetch all the users
//         const doc = new PDF(); //Creates a pdf file
//         res.setHeader("Content-Type", "application/pdf") //tells the client that the response contains a pdf file
//         res.setHeader("Content-Desposition",'inline; filename="user_report.pdf');
//         /*Content-Disposition: Defines how the file should be presented to the user.
//         inline: Instructs the browser to display the file inside the browser window instead of downloading it.
//         filename=user_report.pdf": Suggests a default filename if the user decides to save the file.*/
//         doc.pipe(res);

//         //title
//         doc.fontSize(20).text("User Report",{align: "center"});
//         doc.moveDown();

//         //Table Header
//         doc.text("Name", 100, doc.y);
//         doc.text("Email",300, doc.y);
//         doc.moveDown();

//         // Add Users
//         users.forEach((user, index)=>{
//             doc.text(user.name,100, doc.y);
//             doc.text(user.email,100,doc.y)
//             doc.moveDown();
//         });
//         doc.end();
//     } catch(error){
//         console.error("Error generating PDF:", error);
//         res.status(500).json({message: "Error generating PDF"});
//     }
// });

// module.exports = router;

// const express = require("express");
// const PDFDocument = require("pdfkit");
// const Transaction = require("../models/TransactionSchema");
// const User = require("../models/User");

// const router = express.Router();

// router.get("/receipt/:transactionId", async (req, res) => {
//   try {
//     const { transactionId } = req.params;

//     // Fetch transaction details
//     const transaction = await Transaction.findById(transactionId)
//       .populate("senderId", "name email")
//       .populate("recieverId", "name email");

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     // Create a PDF document
//     const doc = new PDFDocument();
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `inline; filename="receipt_${transactionId}.pdf"`
//     );

//     doc.pipe(res);

//     // Add receipt details
//     doc.fontSize(20).text("Transaction Receipt", { align: "center" });
//     doc.moveDown();
//     doc.fontSize(14).text(`Transaction ID: ${transaction._id}`);
//     doc.text(
//       `Sender: ${transaction.senderId.name} (${transaction.senderId.email})`
//     );
//     doc.text(
//       `Receiver: ${transaction.recieverId.name} (${transaction.recieverId.email})`
//     );
//     doc.text(`Amount: $${transaction.amount}`);
//     doc.text(`Type: ${transaction.type}`);
//     doc.text(`Date & Time: ${transaction.timestamp.toLocaleString()}`);
//     doc.moveDown();
//     doc.text("Thank you for using Digital Wallet!", { align: "center" });

//     doc.end();
//   } catch (error) {
//     console.error("Error generating receipt:", error);
//     res.status(500).json({ message: "Error generating receipt" });
//   }
// });

// module.exports = router;

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
