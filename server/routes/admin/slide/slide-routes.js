const express = require("express");
const route = express.Router();

const controller = require("../../../controllers/admin/slide/slide-controller");
const { upload } = require("../../../helper/upload-cloudinary");
const uploadCloudMiddleware = require("../../../middleware/uploadCloude-middleware");
const validate = require("../../../validates/admin/product/product-validates");

route.post(
  "/add-image",
  upload().single("image"),
  uploadCloudMiddleware.handleImageUpload,
  controller.addImage
);

route.get("/all-image", controller.getAllImage);

route.delete("/delete-image/:id", controller.deleteImage);

route.patch(
  "/edit-image/:id",
  upload().single("image"),
  uploadCloudMiddleware.handleImageUpload,
  controller.editImage
);

module.exports = route;
