const Product = require("../../../models/Product");
const { paginate } = require("../../../utils/paginate");

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

    thirtyDaysAgo.setDate(currentDate.getDate() - 60);

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

module.exports.getShopFilterProduct = async (req, res) => {
  try {
    const {
      Category = [],
      Brand = [],
      sortBy = "price-lowtohigh",
      page,
      limit,
    } = req.query;

    // if (Category.length === 0 && Brand.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     data: [],
    //   });
    // }

    let filters = {};
    if (Category.length) {
      filters.categoryName = { $in: Category.split(",") };
    }

    if (Brand.length) {
      filters.brandName = { $in: Brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }
    
    const products = await paginate(Product, page, limit, filters, sort);
    res.status(200).json({
      success: true,
      message: `Get products page ${page} successffuly.`,
      totalPages: products.totalPages,
      totalItems: products.totalItems,
      data: products.items,
      currentPage: products.currentPage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getShopSearchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const { page, limit } = req.query;
    const regex = new RegExp(keyword, "i");

    const query = {
      $or: [{ name: { $regex: regex } }, { slug: { $regex: regex } }],
      deleted: false,
    };

    const paginateData = await paginate(Product, page, limit, query);

    if (paginateData.totalItems === 0) {
      return res.status(200).json({
        success: true,
        message: `Not found products with keyword ${keyword}`,
      });
    }

    res.status(200).json({
      success: true,
      totalPages: paginateData.totalPages,
      totalItems: paginateData.totalItems,
      data: paginateData.items,
      currentPage: paginateData.currentPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports.getShopPaginationProduct = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const query = {
      deleted: false,
    };

    const paginateData = await paginate(Product, page, limit, query, { price: 1 });

    res.status(200).json({
      success: true,
      message: `Get products page ${page} successffuly.`,
      totalPages: paginateData.totalPages,
      totalItems: paginateData.totalItems,
      data: paginateData.items,
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
