import Product from '../model/productModel.js';
// import AsyncHandler from 'express-async-handler';
import 'express-async-errors';

export const getProducts = async (req, res) => {
  const products = await Product.find({});

  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: 'The product list is empty !' });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};
