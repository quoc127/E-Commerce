const express = require("express");
const route = express.Router();

const controller = require("../../../controllers/admin/product/product-controller");
const { upload } = require("../../../helper/upload-cloudinary");
const uploadCloudMiddleware = require("../../../middleware/uploadCloude-middleware");
const validate = require("../../../validates/admin/product/product-validates") 

route.post(
  "/add-product",
  upload().single("image"),
  validate.AddProduct,
  uploadCloudMiddleware.handleImageUpload,
  controller.addProduct
);

// route.get("/all-product", controller.getAllProduct);
// route.get("/:id", controller.getProductById);

// route.patch("/edit/:id", controller.editProduct);

// route.delete("/delete/:id", controller.deleteProduct);

module.exports = route;
