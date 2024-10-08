module.exports.AddProduct = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: "Product name is required!",
    });
  }
  if (!req.body.price) {
    return res.status(400).json({
      success: false,
      message: "Price is required!",
    });
  }
  if (!req.body.brandId) {
    return res.status(400).json({
      success: false,
      message: "Brand name is required!",
    });
  }
  if (!req.body.categoryId) {
    return res.status(400).json({
      success: false,
      message: "Category name is required!",
    });
  }
  next();
};
