const mongoose = require("mongoose");

const productdata = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const products = mongoose.model("products", productdata);

module.exports = {
  products,
};
