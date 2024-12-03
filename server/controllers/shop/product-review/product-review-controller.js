const Order = require("../../../models/Order");
const ProductReview = require("../../../models/Review");
const Product = require("../../../models/Product");

module.exports.postReview = async (req, res) => {
  try {
    const { userId, productId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId: userId,
      "cartItems.productId": productId,
    });
    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      productId: productId,
      userId: userId,
      userName: userName,
      reviewMessage: reviewMessage,
      reviewValue: reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId: productId });
    const totalReview = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReview;
    await Product.findByIdAndUpdate(productId, {
      averageReview: averageReview,
    });
    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports.getReview = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await ProductReview.find({ productId: productId });
    if (!reviews) {
      return res.status(403).json({
        success: false,
        message: "No reviews",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Get reviews successfully",
      data: reviews,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
