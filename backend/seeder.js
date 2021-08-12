import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './model/userModel.js';
import Product from './model/productModel.js';
import Order from './model/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const usersCreated = await User.insertMany(users);
    const adminUserId = usersCreated[0]._id;

    // number of products per page (6 product)
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUserId,
      };
    });

    // number of products total page (15 page)
    let seedProducts = [];
    for (let i = 0; i < 15; i++) {
      seedProducts = [...seedProducts, ...sampleProducts];
    }

    console.log(`Num of products: ${seedProducts.length}`.bgGreen.inverse);

    await Product.insertMany(seedProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
