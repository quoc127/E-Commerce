const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Unauthorised user",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorised user",
    });
  }
};
