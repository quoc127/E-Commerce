const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already exists with the same email or username! Please try again",
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
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "60m",
      }
    );
    res.status(200).json({
      success: true,
      message: "Login Successfuly!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
