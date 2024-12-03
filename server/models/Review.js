const mongoose = require("mongoose");

const ProductReviewSchema = mongoose.Schema(
  {
    productId: String,
    userId: String,
    userName: String,
    reviewMessage: String,
    reviewValue: Number,
  },
  {
    timestamps: true,
  }
);

const ProductReview = mongoose.model(
  "ProductReview",
  ProductReviewSchema,
  "product-review"
);
module.exports = ProductReview;
