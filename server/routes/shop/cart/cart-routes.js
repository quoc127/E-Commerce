const express = require("express")
const route = express.Router()
const controller = require("../../../controllers/shop/cart/cart-controller")

route.post("/add", controller.addToCart)
route.get("/get/:userId", controller.getCartItems)

module.exports = route;