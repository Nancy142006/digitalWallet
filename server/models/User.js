const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  balance: { type: Number, default: 0 },
  profilePicture: {
    type: String,
    default: "../images/icons8-avatar-50.png",
  },
});

module.exports = mongoose.model("User", UserSchema);
