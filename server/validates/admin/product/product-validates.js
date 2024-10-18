const validateField = (field, value, type, res) => {
  if (!value) {
    return res.status(400).json({
      success: false,
      message: `${field} is required!`,
    });
  }
  if (typeof value !== type) {
    return res.status(400).json({
      success: false,
      message: `${field} must be of type ${type}!`,
    });
  }
};

module.exports.AddProduct = (req, res, next) => {
  const { name, price, brandId, categoryId } = req.body;
  const priceType = parseInt(price)

  if (validateField("Product name", name, "string", res)) return;
  if (validateField("Price", priceType, "number", res)) return;
  if (validateField("Brand name", brandId, "string", res)) return;
  if (validateField("Category name", categoryId, "string", res)) return;

  next();
};

module.exports.EditProduct = (req, res, next) => {
  const { name, price, brandId, categoryId } = req.body;
  const priceType = parseInt(price)

  if (validateField("Product name", name, "string", res)) return;
  if (validateField("Price", priceType, "number", res)) return;
  if (validateField("Brand ID", brandId, "string", res)) return;
  if (validateField("Category ID", categoryId, "string", res)) return;

  next();
};
