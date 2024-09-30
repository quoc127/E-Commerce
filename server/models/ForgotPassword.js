const mongoose = require("mongoose");

const ForPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt:{
      type: Date,
      expires: 180
    }
  },
  {
    timestamps: true,
  }
);

const ForgotPassword = mongoose.model("ForgotPassword", ForPasswordSchema, "forgot-password");

module.exports = ForgotPassword;