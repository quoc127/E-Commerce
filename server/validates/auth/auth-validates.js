module.exports.RegisterValidate = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!req.body.userName) {
    return res.json({
      success: false,
      message: "Username is required!"
    })
  }

  if(!req.body.email) {
    return res.json({
      success: false,
      message: "Email is required!"
    })
  }

  if(!emailRegex.test(req.body.email)) {
    return res.json({
      success: false,
      message: "Invalid email!"
    })
  }

  if(!req.body.password) {
    return res.json({
      success: false,
      message: "Password is required!"
    })
  }

  next();
}

module.exports.ChangePasswordValidate = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!req.body.email) {
    return res.json({
      success: false,
      message: "Email is required!"
    })
  }

  if(!emailRegex.test(req.body.email)) {
    return res.json({
      success: false,
      message: "Invalid email!"
    })
  }

  if(!req.body.password) {
    return res.json({
      success: false,
      message: "Password is required!"
    })
  }

  next();
}

module.exports.ForgotPasswordValidate = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!req.body.email) {
    return res.json({
      success: false,
      message: "Email is required!"
    })
  }

  if(!emailRegex.test(req.body.email)) {
    return res.json({
      success: false,
      message: "Invalid email!"
    })
  }
  next();
}

module.exports.ResetPasswordValidate = (req, res, next) => {

  if(!req.body.password) {
    return res.json({
      success: false,
      message: "Password is required!"
    })
  }
  next();
}