module.exports.CategoryValidate = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required!",
    });
  }
  next();
};
