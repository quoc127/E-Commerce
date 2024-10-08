const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description : String,
  status: {
    type: String,
    default: "active",
  },
  deleted:{
    type: Boolean,
    default: false
  },
  deletedAt: Date
});

const Brand = mongoose.model("Brand", BrandSchema, "brands");
module.exports = Brand;
