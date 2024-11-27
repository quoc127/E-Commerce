const express = require("express")
const route = express.Router()

const controller = require("../../../controllers/shop/address/address-controller")

route.post("/add", controller.postAddress)
route.get("/get/:userId", controller.getAddress)
route.patch("/update/:userId/:addressId", controller.updateAddress)
route.delete("/delete/:userId/:addressId", controller.deleteAddress)

module.exports = route