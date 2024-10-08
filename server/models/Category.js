const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
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

const Category = mongoose.model("Category", CategorySchema, "categories");
module.exports = Category;
