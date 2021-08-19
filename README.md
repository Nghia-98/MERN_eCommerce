# ProShop eCommerce Platform built with the MERN stack & Redux.

This is a project for my studying course, I have refactored a little bit & add more features by myself.

[MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce).

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
- Run project with Dockerfile & docker-compose (Non-Functional)
- Upload images to AWS S3 service
- Search products in admin screen
- Toast notify to show status of CRUD action
- Custom pagination component without library
- Split Frontend & Backend into Firebase static_web_app & Heroku Nodejs_app (Non-Functional)
- Use React Lazy Import & React Suspense to fetch react app from host server faster (Non-Functional)
- Login with social account (Facebook, Google)
- Verify email with nodeMailer

- I'm implementing some other features.

## Usage

### ES Modules in Node

We us ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

## 1. Env file of Frontend React App

Create a .env file in folder ./frotend and add the following

```
HTTPS = true // to use Facebook login
REACT_APP_JWT_SECRET = your_jwt_secret
REACT_APP_BACKEND_HOST = http://localhost:5000
```

## 2. Env file of Backend NodeJS App

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
PAYPAL_CLIENT_ID = your_paypal_client_id

AWS_ACCESS_KEY_ID = your_aws_access_id
AWS_SECRET_ACCESS_KEY = your_aws_secret_key

FACEBOOK_CLIENT_APP_ID = your_FB_ID
GOOGLE_CLIENT_APP_ID = your_GG_ID

FRONTEND_HOST_ADDRESS = https://localhost:3000

EMAIL_USER_NAME = your_email_to_use_nodemailer
EMAIL_PASSWORD = your_email_password
```

### Run With Docker

## 1. Create image for backend - server (nodejs app)

```
docker build . -t image-backend
```

## 2. Create image for frontend - client (react app)

```
cd frontend
docker build . -t image-frontend
```

## 3. Run both backend (http://localhost:5000) & frontend (https://localhost:3000)

```
cd .. (back to the root path of the project)
docker-compose up -d

# Go to http://localhost:5000 & https://localhost:3000 to see the website
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run Without Docker

```
# Run fontend only
cd frontend && npm run start
or
npm run client

# Run backend only
npm run server

# Run frontend (https://localhost:3000) & backend (http://localhost:5000)
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
