const { imageUploadUtil } = require("../helper/upload-cloudinary");

module.exports.handleImageUpload = async (req, res, next) => {
  try {
    if (req.file) {
      const base64 = Buffer.from(req.file.buffer).toString("base64");
      const url = "data:" + req.file.mimetype + ";base64," + base64;
      const result = await imageUploadUtil(url);
      req.imageUrl = result.url;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
