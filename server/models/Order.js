const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    userId: String,
    cartId: String,
    cartItems: [
      {
        productId: String,
        title: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    addressInfo: {
      addressId: String,
      country: String,
      city: String,
      address: String,
      phoneNumber: Number,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema, "orders");
module.exports = Order;
