const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const Product = require("../models/productModel");

//@desc     Get products
//@route    GET /api/products
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  res.status(200).json(product);
});

//@desc     Get products by ID
//@route    GET /api/products/:id
const getProductId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // Check if product not exist
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

//@desc     Set products
//@route    POST /api/products
const setProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, status } = req.body;

  if (!req.body.name || !req.body.price || !req.body.stock) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  //Check if users exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("Product name already exists");
  }

  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../uploads", image.originalname);
    fs.renameSync(image.path, target);
    const product = await Product.create({
      name,
      price,
      stock,
      status,
      image_url: `https//localhost:3000/public/${image.originalname}`,
    });
    res.status(200).json(product);
  } else {
    const product = await Product.create({
      name,
      price,
      stock,
      status,
      image_url : ""
    });
    res.status(200).json(product);
  }
});

//@desc     Update products
//@route    PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../uploads", image.originalname);
    fs.renameSync(image.path, target);
    const updateProduct = await Product.findByIdAndUpdate(product, req.body, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } else {
    const updateProduct = await Product.findByIdAndUpdate(product, req.body, {
      new: true,
    });
    res.status(200).json(updateProduct);
  }
});

//@desc     Delete products
//@route    DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  // await Product.remove() = remove all
  await product.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProduct,
  getProductId,
  setProduct,
  updateProduct,
  deleteProduct,
};
