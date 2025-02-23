const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    senderId:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    recieverId:{ type: mongoose.Schema.Types.ObjectId, ref:"User"},
    amount:{type: Number, required: true},
    type:{type: String, enum:["deposit","send"], required: true},
    timestamp:{ type: Date, default: Date.now}
});

module.exports = mongoose.model("Transaction", TransactionSchema);