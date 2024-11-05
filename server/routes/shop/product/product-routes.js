const express = require("express");
const route = express.Router();
const controller = require("../../../controllers/shop/product/product-controller");

route.get("/all-products", controller.getShopAllProducts);
route.get("/product-detail/:id", controller.getShopProductDetail);
route.get("/new-products", controller.getShopNewProduct);
route.get("/category", controller.getShopProductByCategory);
route.get("/filter", controller.getShopFilterProduct);

module.exports = route;
