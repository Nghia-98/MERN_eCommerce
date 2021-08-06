import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

// This thunk middleware will dispatch when user click button AddToCart in ProductScreen
// When click btn AddToCart -> we push history `/cart/id?qty={qty}` to render cartScreen
// => we dispatch it in useEffect of cartScreen component

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // Instead of fetch data from server (take time),
  // we can getState from reduxStore (getState().productDetails.product)
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND_HOST}/api/products/${id}`
  );

  // dispatch action (with payload info) to cartReducers => push itemAdd to state.cart.cartItems
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // after save card info to redux state -> save card info down to localStorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  // 1. dispatch action (with payload info) to cartReducers => delete product from state.cart.cartItems
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      id,
    },
  });

  // update localStorage after delete a product in cart
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: {
      data,
    },
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};
