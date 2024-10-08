const express = require("express");
const route = express.Router();

const controller = require("../../..//controllers/admin/category/category-controller");
const validate = require("../../../validates/admin/category/category-validates");

route.post("/add-category", validate.CategoryValidate, controller.addCategory);

route.get("/all-category", controller.getAllCategory);
route.get("/:id", controller.getCategoryById);

route.patch("/edit/:id", validate.CategoryValidate, controller.editCategory);

route.delete("/delete/:id", controller.deleteCategory);
 
module.exports = route;
