import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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

    default:
      return {
        ...state,
      };
  }
};
