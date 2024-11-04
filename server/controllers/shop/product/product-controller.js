const Product = require("../../../models/Product");

module.exports.getShopAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({
      deleted: false,
      status: "active",
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Get all products successfully.",
      data: allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getShopProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetail = await Product.findOne({
      _id: id,
      deleted: false,
      status: "active",
    });
    if (!productDetail) {
      return res.status(400).json({
        success: false,
        message: "Product not found! Please try again.",
      });
    }

    res.status(200).json({
      message: true,
      data: productDetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getShopNewProduct = async (req, res) => {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate);

    thirtyDaysAgo.setDate(currentDate.getDate() - 5);

    const newProducts = await Product.find({
      createdAt: { $gte: thirtyDaysAgo },
      status: "active",
      deleted: false,
    });

    if (newProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There are currently no featured products.",
      });
    }

    res.status(200).json({
      message: true,
      data: newProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getShopProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const productByCategory = await Product.find({
      deleted: false,
      status: "active",
      categoryName: category,
    });

    if (productByCategory.length === 0) {
      return res.status(404).json({
        success: true,
        message: `There are no products in category ${category}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get products in category ${category} successffuly`,
      data: productByCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
