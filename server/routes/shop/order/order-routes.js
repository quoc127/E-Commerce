const express = require("express");
const route = express.Router();
const controller = require("../../../controllers/shop/order/order-controller")

route.post("/create", controller.postCreateOrder)
route.post("/capture", controller.postCaptureOrder)
route.get("/list/:userId", controller.getAllOrderByUer)
route.get("/detail/:orderId", controller.getDetailOrder)

module.exports = route;