const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// Create a new product with data
exports.createProduct = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      status: false,
    });
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageURL: req.body.imageURL,
    createdBy: user,
  });

  console.log(product);
  await product.save();
  res.status(201).json({
    data: product,
    message: "Product Created Successfully",
    status: true,
  });
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
