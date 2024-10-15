const express = require("express");
const route = express.Router();

const controller = require("../../..//controllers/admin/brand/brand-controller");
const validate = require("../../../validates/admin/brand/brand-validates");

route.post("/add-brand", validate.BrandValidate, controller.addBrand);

route.get("/all-brand", controller.getAllBrand);
route.get("/pagination", controller.getPagination);
route.get("/:id", controller.getBrandById);

route.patch("/edit/:id", validate.BrandValidate, controller.editBrand);

route.delete("/delete/:id", controller.deleteBrand);

module.exports = route;
