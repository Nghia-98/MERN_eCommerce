# MERN_eCommerce Platform

> eCommerce platform built with the MERN stack & Redux.

This is the MERN_eCommerce project for my studing course: [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce)

![screenshot](https://github.com/bradtraversy/proshop_mern/blob/master/uploads/Screen%20Shot%202020-09-29%20at%205.50.52%20PM.png)

## Features of the course

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Features outside the course (I research others resources and implement myself)

- Handle resource not found in react app (404 - page not found)
- Upload images to AWS S3 service
- Search products in admin screen
- Toast notify to show status of CRUD action
- Custom pagination component without library
- Split Frontend & Backend into Firebase static_web_app & Heroku Nodejs_app (Non-Functional)
- Use React Lazy Import & React Suspense to fetch react app from host server faster (Non-Functional)
- Login with social account (Facebook, Google)

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

## 1. Env file of Frontend React App

Create a .env file in folder ./frotend and add the following

```
HTTPS = true
REACT_APP_JWT_SECRET = your_jwt_secret
REACT_APP_BACKEND_HOST = your_backend_host_address
```

## 1. Env file of Backend NodeJS App

Create a .env file in then root and add the following

```
HTTPS=true
NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
PAYPAL_CLIENT_ID = your_paypal_client_id

AWS_ACCESS_KEY_ID = your_aws_access_id
AWS_SECRET_ACCESS_KEY = your_aws_secret_key

FACEBOOK_CLIENT_APP_ID = your_FB_ID
GOOGLE_CLIENT_APP_ID = your_GG_ID
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run fontend only
cd frontend && npm run start
or
npm run client

# Run backend only
npm run server

# Run frontend (:3000) & backend (:5000)
npm run dev

```

## Build & Deploy

```
# 1. Deploy Backend on Heroku server
- Go to Heroku -> Follow the instructions.

# 2.Deploy Frontend react app on Firebase
- Create Firebase application -> Choose Hosting service and follow the instructions.
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@gmail.com (Admin)
admin

john@gmail.com (Customer)
john

jane@gmail.com (Customer)
jane
```

## License

The MIT License

Copyright (c) 2020 Traversy Media https://traversymedia.com
