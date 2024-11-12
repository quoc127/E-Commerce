const mongoose = require("mongoose");

const SlideSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Slide = mongoose.model("Slide", SlideSchema, "slides");
module.exports = Slide;
