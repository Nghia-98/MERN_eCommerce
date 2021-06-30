import Product from '../model/productModel.js';
// import AsyncHandler from 'express-async-handler';
import 'express-async-errors';

// @desc:   Get all products
// @route:  GET /api/products
// @access: Public
export const getProducts = async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'The product list is empty !' });
  }
};

// @desc:   Get single product by ID
// @route:  GET /api/products/:id
// @access: Public
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};

// @desc:   Delete single product by ID
// @route:  DELETE /api/products/:id
// @access: Private, Admin
export const deleteProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};
