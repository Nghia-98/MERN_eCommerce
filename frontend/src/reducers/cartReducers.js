import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_INFO_RESET,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  action
) => {
  //----------------------------------cartItems: {...productInfo, product: objectID, quantity}[]
  switch (action.type) {
    case CART_ADD_ITEM:
      // item that we wanna add to cart
      const itemAdd = action.payload;
      // return item is existing in cart / or not
      const itemExist = state.cartItems.find(
        (cartItem) => cartItem.product === itemAdd.product
      );

      if (itemExist) {
        // itemAdd alredy existing cartItems
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            //-> we will update info cartItem at that index (ex: update quantity of cardItem)
            return cartItem.product === itemAdd.product ? itemAdd : cartItem;
          }),
        };
      } else {
        // if itemAdd not existing in cartItems -> just push it in cartItems
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdd],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((el, i, arr) => {
          return el.product !== action.payload.id;
        }),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload.data,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_INFO_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: '',
      };

    default:
      return {
        ...state,
      };
  }
};
