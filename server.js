const express = require("express"); // import express module . it is used to create server and handle request and response

require("dotenv").config(); // import dotenv module . it is used to read .env file and set value to process.env

const mongoose = require("mongoose"); // import mongoose module . it is used to connect to mongodb database
const Product = require("./models/productsModel");

const app = express(); // create express server object. it is used to create server and handle request and response

app.use(express.json()); // use express.json() middleware to parse request body

app.get("/products", async (req, res) => {
  // getting all products
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      stack: error.stack,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  // get a particular product
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, stack: error.stack });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `Not found with id ${id}` });
    } else {
      const updatedProduct = await Product.findById(id);
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, stack: error.stack });
  }
});

app.post("/api/product", async (req, res) => {
  try {
    const product = await Product.create(req.body); // create a new product object from Product model
    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, stack: error.stack });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        message: `No product found with id ${id}`,
      });
    } else {
      res.status(200).json({
        message: `Deleted the product of id ${id} successfully`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, stack: error.stack });
  }
});

app.delete("/products", async (req, res) => {
  try {
    const product = await Product.deleteMany();
    res.status(200).json({
      message: "Deleted all campaigns",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, stack: error.stack });
  }
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(
      "......................................................................................................."
    );
    console.log("connected to mongodb");
    app.listen(3000, () => {
      // start server on port 3000
      console.log("server started on port 3000");
    });
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });
