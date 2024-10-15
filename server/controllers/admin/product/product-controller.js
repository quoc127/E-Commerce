const Product = require("../../../models/Product");
const { paginate } = require("../../../utils/paginate");

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

module.exports.getAllProduct = async (req, res) => {
  try {
    const allProducts = await Product.find({ deleted: false });

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

module.exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const checkProduct = await Product.findOne({ _id: id, deleted: false });
    if (!checkProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: ${id} not found! Please try again.`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get product with id: ${id} successfully.`,
      data: checkProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, total, brandId, categoryId } = req.body;
    const image = req.imageUrl;

    const checkProduct = await Product.findOne({ _id: id, deleted: false });
    if (!checkProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: ${id} dose't exist! Please try again.`,
      });
    }

    await Product.updateOne(
      {
        _id: id,
      },
      {
        name: name,
        image: image,
        price: price,
        description: description,
        total: total,
        brandId: brandId,
        categoryId: categoryId,
      }
    );
    res.status(200).json({
      success: true,
      message: `Update product with id: ${id} successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const checkProduct = await Product.findOne({ _id: id, deleted: false });
    if (!checkProduct) {
      return res.status(404).json({
        success: false,
        message: `Product with id: ${id} not found! Please try again.`,
      });
    }
    await checkProduct.updateOne({ deleted: true });

    res.status(200).json({
      success: true,
      message: `Delete product with id: ${id} successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getPagination = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const paginateData = await paginate(Product, page, limit);

    res.status(200).json({
      success: true,
      message: `Get products page ${page} successffuly.`,
      totalPages: paginateData.totalPages,
      totalProducts: paginateData.totalProducts,
      products: paginateData.product,
      currentPage: paginateData.currentPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
