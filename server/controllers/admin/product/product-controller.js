const Product = require("../../../models/Product");

module.exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, total, brandId, categoryId } = req.body;
    const image = req.imageUrl;
    const newProduct = new Product({
      name: name,
      image: image,
      price: price,
      description: description,
      total: total,
      brandId: brandId,
      categoryId: categoryId,
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Create product successfully.",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
