import Product from "../models/ProductModel.js";
import asyncHandler from "../Middleware/asyncHandler.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products); // Fixed 'json' to 'res.json'
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product); // Fixed 'json' to 'res.json'
  } else {
    res.status(404);
    throw new Error("Product does not exist"); // Fixed grammar
  }
});

export { getProduct, getProductById };
