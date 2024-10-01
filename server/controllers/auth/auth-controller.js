const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendMail } = require("../../helper/sendMail");
const ForgotPassword = require("../../models/ForgotPassword");

module.exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (checkUser) {
      return res.json({
        success: false,
        message:
          "User Already exists with the same email or username! Please try again",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName: userName,
      email: email,
      password: hashPassword,
    });

    newUser.save();

    res.status(201).json({
      success: true,
      message: "Create new user successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email: email });
  try {
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).status(200).json({
      success: true,
      message: "Login Successfuly!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logout successfuly."
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
}

module.exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists! Please enter again.",
      });
    }

    const isPasswordSame = await bcrypt.compare(password, checkUser.password);
    if (isPasswordSame) {
      return res.status(404).json({
        success: false,
        message: "The new password cannot be the same as the old password.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    await User.updateOne({ password: hashPassword });
    res.status(200).json({
      success: true,
      message: "Change password successfuly!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.fotgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please enter again.",
      });
    }
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const text = `
    Mã OTP xác minh lấy lại mật khẩu là ${checkUser.resetToken}. Thời hạn sử dụng là 3 phút. Lưu ý không để lộ thông tin OTP!
  `;
    sendMail(checkUser.email, subject, text);

    const userForgotPassword = {
      email: checkUser.email,
      otp: resetToken,
      expireAt: new Date(Date.now() + 180 * 1000),
    };

    const forgotPassword = new ForgotPassword(userForgotPassword);
    await forgotPassword.save();
    res.status(200).json({
      success: true,
      message: "An email has been sent with password reset instructions.",
      data: forgotPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;

    const checkUserForgotPassword = await ForgotPassword.findOne({
      otp: otp,
      expireAt: { $gt: Date.now() },
    });

    if (!checkUserForgotPassword) {
      return res.status(400).json({
        success: false,
        message: "Password reset token invalid or has expired.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const userResetPassword = await User.findOneAndUpdate(
      {
        email: checkUserForgotPassword.email,
      },
      { password: hashPassword },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Reset password successfuly.",
      data: userResetPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
