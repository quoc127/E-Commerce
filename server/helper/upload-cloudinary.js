const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRECT,
});

const storage = new multer.memoryStorage();

module.exports.imageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "E-commerce/products",
    resource_type: "auto",
  });
  return result;
};

module.exports.upload = () => {
  return multer({storage})
}