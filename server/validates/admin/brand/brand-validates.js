module.exports.BrandValidate = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Brand name is required!",
    });
  }
  next();
};
