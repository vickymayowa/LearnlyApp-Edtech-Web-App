const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create a new product with data
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageURL: req.body.imageURL,
      createdBy: {
        _id: req.user._id,
        username: req.user.username,
      },
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(products);
});

// Get a single product by ID
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .send({ message: "Product not found", status: false });
  }
  res
    .status(200)
    .send({ message: "All Product Retrieved SuccessFully", status: true });
});

// Update a product by ID
exports.updateProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res
      .status(404)
      .send({ message: "Product not found", status: false });
  }
  res
    .status(200)
    .send({ message: "Product Updated successfully", status: true });
});

// Delete a product by ID
exports.deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res
      .status(404)
      .send({ message: "Product not found", status: false });
  }
  res
    .status(200)
    .send({ message: "Product deleted successfully", status: true });
});
