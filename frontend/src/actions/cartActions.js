import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

// This thunk middleware will dispatch when user click button AddToCart in ProductScreen
// When click btn AddToCart -> we push history `/cart/id?qty={qty}` to render cartScreen
// => we dispatch it in useEffect of cartScreen component

export const addToCart = (id, qty) => async (dispatch, getState) => {
  //fetch single product info
  const { data } = await axios.get(`/api/products/${id}`);

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
