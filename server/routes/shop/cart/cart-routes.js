const express = require("express")
const route = express.Router()
const controller = require("../../../controllers/shop/cart/cart-controller")

route.post("/add", controller.addToCart)
route.get("/get/:userId", controller.getCartItems)
route.patch("/update", controller.updateCartItems)
route.delete("/delete/:userId/:productId", controller.deleteCartItems)

module.exports = route;