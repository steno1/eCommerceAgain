import Product from "../models/ProductModel.js";
import asyncHandler from "../Middleware/asyncHandler.js";

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products); 
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product); 
    res.status(404);
    throw new Error("Product does not exist"); 
  }
});

const createProduct=asyncHandler(async(req, res)=>{
  
  const newProduct=new Product({
    user: req.user._id,
    name:"Sample name",
     brand:"Sample Brand",
    category:'Sample Category',
       price:0,
       image:'/images/sample.jpg',
       description:"Sample description",
       countInStock:0,
       numReviews:0
  });
  const createProducts=await newProduct.save();
  res.status(201).json(createProducts)
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, price, image, countInStock, description } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    product.description = description;
    product.image = image;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


export { getProduct, getProductById, createProduct, updateProduct};
