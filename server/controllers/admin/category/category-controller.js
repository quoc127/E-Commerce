const Category = require("../../../models/Category");

module.exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const checkBrand = await Category.findOne({ name: name });
    if (checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Category exists! Please try again",
      });
    }

    const newBrand = new Category({
      name: name,
      description: description,
    });

    newBrand.save();

    res.status(201).json({
      success: true,
      message: "Create Category is successfuly!",
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

module.exports.getAllCategory = async (req, res) => {
  try {
    const allBrand = await Category.find({ deleted: false });

    res.status(200).json({
      success: true,
      message: "Get all Category",
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

module.exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const checkBrand = await Category.findOne({ _id: id, deleted: false });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Id does't exist! Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Get Category with ${id} successfully.`,
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

module.exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const checkBrand = await Category.findOne({ _id: id, deleted: false });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Category Id not found! Please try again.",
      });
    }

    await Category.updateOne(
      { _id: id },
      {
        name: name,
        description: description,
      }
    );
    res.status(200).json({
      success: true,
      message: `Edit Category with ${id} successfully.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const checkBrand = await Category.findOne({ _id: id });

    if (!checkBrand) {
      return res.status(400).json({
        success: false,
        message: "Category Id not found! Please try again.",
      });
    }

    await Category.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.status(200).json({
      success: true,
      message: "Delete Category successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};