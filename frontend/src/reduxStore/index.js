import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from '../reducers/userReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from '../reducers/orderReducers';
import { authTokenReducer } from '../reducers/authTokenReducers';
import {
  emailVerificationReducers,
  getEmailVerificationReducers,
} from '../reducers/emailVerificationReducers';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  authToken: authTokenReducer,
  getEmailVerification: getEmailVerificationReducers,
  emailVerification: emailVerificationReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
});

const cartItemsLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAdressLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodLocalStorage =
  JSON.parse(localStorage.getItem('paymentMethod')) || '';

const tokenLocalStorage = localStorage.getItem('token') || '';
console.log('tokenLocalStorage', tokenLocalStorage);

// const userInfoLocalStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

const initialState = {
  cart: {
    cartItems: cartItemsLocalStorage,
    shippingAddress: shippingAdressLocalStorage,
    paymentMethod: paymentMethodLocalStorage,
  },
  authToken: {
    token: tokenLocalStorage,
  },
  // userLogin: { userInfo: userInfoLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
