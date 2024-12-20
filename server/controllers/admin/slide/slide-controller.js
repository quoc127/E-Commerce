const Slide = require("../../../models/Slide");

module.exports.getAllImage = async (req, res) => {
  try {
    const allImage = await Slide.find();
    if (!allImage) {
      return res.status(400).json({
        success: false,
        message: "No image slide",
      });
    }
    res.status(200).json({
      success: true,
      message: "Get all image slide successfully!",
      data: allImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.addImage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.imageUrl;

    const newImageSlide = new Slide({
      name: name,
      description: description,
      image: image,
    });
    await newImageSlide.save();
    res.status(201).json({
      success: true,
      message: "Create Image Slide Successffly!",
      data: newImageSlide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDelete = await Slide.find({ _id: id });
    if (!imageDelete) {
      return res.status(400).json({
        success: false,
        message: "Not found image!",
      });
    }
    await Slide.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Delete image slide succssfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports.editImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.imageUrl;

    const imageDelete = await Slide.find({ _id: id });
    if (!imageDelete) {
      return res.status(400).json({
        success: false,
        message: "Not found image!",
      });
    }
    await Slide.updateOne(
      { _id: id },
      {
        name: name,
        description: description,
        image: image,
      }
    );
    res.status(200).json({
      success: true,
      message: "Update successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
