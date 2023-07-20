const mongoose = require("mongoose"); // import mongoose module . it is used to connect to mongodb database

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name, it is a required field"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter the quantity, it is a required field"],
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema); // create a model named Product

module.exports = Product; // export the model
