const express = require("express");
const route = express.Router();
const controller = require("../../../controllers/shop/product-review/product-review-controller");

route.post("/add", controller.postReview);
route.get("/get/:productId", controller.getReview);

module.exports = route;
