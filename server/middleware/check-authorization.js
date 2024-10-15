const jwt = require("jsonwebtoken");

// module.exports.verifyToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (authHeader && authHeader.startsWith("Bearer")) {
//     const token = authHeader.split(" ")[1];
//     try {
//       const decode = jwt.verify(token, process.env.JWT_ACESS_TOKEN_KEY);
//       req.user = decode;
//       next();
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }
//   } else {
//     return res.status(401).json({
//       success: false,
//       message: "No token, authorization denied",
//     });
//   }
// };

module.exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_ACESS_TOKEN_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports.adminRole = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};

module.exports.userRole = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "User access required",
    });
  }
  next();
};
