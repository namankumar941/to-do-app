const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
