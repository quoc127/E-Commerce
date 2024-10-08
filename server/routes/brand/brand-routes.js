const express = require("express");
const route = express.Router();

const controller = require("../../controllers/brand/brand-controller");
const validate = require("../../validates/brand/brand-validates");

route.post("/add-brand", validate.BrandValidate, controller.addBrand);

route.get("/all-brand", controller.getAllBrand);
route.get("/:id", controller.getBrandById);

route.patch("/edit/:id", validate.BrandValidate, controller.editBrand);

route.delete("/delete/:id", controller.deleteBrand);

module.exports = route;
