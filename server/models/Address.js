const mongoose = require("mongoose")

const AddressSchema = mongoose.Schema(
  {
    userId: String,
    country: String,
    city: String,
    address: String,
    phoneNumber: Number
  },
  {
    timestamps: true,
  }
)

const Address = mongoose.model("Address", AddressSchema, "address")
module.exports = Address