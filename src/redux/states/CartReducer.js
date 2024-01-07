import axios from "axios";

const initialState = {
  productsCart: [],
};

const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART= "REMOVE_PRODUCT_FROM_CART"

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        productsCart: [...state.productsCart, action.payload],
      };
      case REMOVE_PRODUCT_FROM_CART:
        const updatedProducts = state.productsCart.filter(
          (product) => product.id !== action.payload.id
        );
        return {
          ...state,
          productsCart: updatedProducts,
        };
    default:
      return state;
  }
}

export const addProduct = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
});

export const deleteProduct = (product) => ({
    type: REMOVE_PRODUCT_FROM_CART,
    payload: product,
});
