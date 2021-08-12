import Product from '../model/productModel.js';
// import AsyncHandler from 'express-async-handler';
import 'express-async-errors';

// @des:    Get all products
// @route: Get /api/products/all
// @access: Public

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json({ products });
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};

// @desc:   Get products per page
// @route:  GET /api/products
// @access: Public
export const getProducts = async (req, res) => {
  const pageSize = 6;
  const pageQueryNumber = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const totalProductsCount = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip((pageQueryNumber - 1) * pageSize)
    .sort({ _id: -1 });

  if (products) {
    res.json({
      products,
      currentPage: pageQueryNumber,
      totalPages: Math.ceil(totalProductsCount / pageSize),
      // totalPages: 20,
    });
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
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};

// @desc:   Delete single product by ID
// @route:  DELETE /api/products/:id
// @access: Private/Admin
export const deleteProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};

// @desc:   Create product
// @route:  POST /api/products
// @access: Private/Admin
export const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const productCreated = await product.save();

  res.status(201).json({
    message: 'Product created successfully!',
    product: productCreated,
  });
};

// @desc:   Update product by id
// @route:  PUT /api/products/:id
// @access: Private/Admin
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const { name, image, price, brand, category, countInStock, description } =
    req.body;

  const product = await Product.findById(productId);

  if (product) {
    product.name = name;
    product.image = image;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const productUpdated = await product.save();

    res.status(200).json({
      message: 'Product updated successfully!',
      product: productUpdated,
    });
  } else {
    res.status(404);
    throw new Error('Product not found!');
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You already reviewed this product!');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404).json({ message: 'Product not found !' });
  }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
};
