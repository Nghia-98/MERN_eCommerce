import express, { Router } from 'express';
const router = express.Router();
import Product from '../model/productModel.js';
import AsyncHandler from 'express-async-handler';

// @desc: Fetch all products
// @route: GET /api/product
// @access: Public
router.get(
  '/',
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ message: 'The product list is empty !' });
    }
  })
);

// @desc: Fetch single product
// @route: GET /api/product/:id
// @access: Public
router.get(
  '/:id',
  AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found !' });
    }
  })
);

export default router;
