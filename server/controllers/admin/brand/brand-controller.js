const Brand = require("../../../models/Brand");
const { paginate } = require("../../../utils/paginate");

module.exports.addBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const checkBrand = await Brand.findOne({ name: name });
    if (checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Brand exists! Please try again",
      });
    }

    const newBrand = new Brand({
      name: name,
      description: description,
    });

    await newBrand.save();

    res.status(201).json({
      success: true,
      message: "Create Brand is successfuly!",
      data: newBrand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.getAllBrand = async (req, res) => {
  try {
    const allBrand = await Brand.find({ deleted: false }).sort({createdAt: -1});

    res.status(200).json({
      success: true,
      message: "Get all brand",
      data: allBrand,
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

    const paginateData = await paginate(Brand, page, limit);

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
}

module.exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkBrand = await Brand.findOne({ _id: id, deleted: false });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Id does't exist! Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Get Brand with ${id} successfully.`,
      data: checkBrand,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.editBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const checkBrand = await Brand.findOne({ _id: id, deleted: false });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Brand Id not found! Please try again.",
      });
    }

    await Brand.updateOne(
      { _id: id },
      {
        name: name,
        description: description,
      }
    );
    res.status(200).json({
      success: true,
      message: `Edit Brand with ${id} successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const checkBrand = await Brand.findOne({ _id: id });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Brand Id not found! Please try again.",
      });
    }

    await Brand.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.status(200).json({
      success: true,
      message: "Delete Brand successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
