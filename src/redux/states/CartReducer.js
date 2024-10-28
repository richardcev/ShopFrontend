const initialState = {
  productsCart: [],
  cantidadProductos: 0,
  subTotal: 0,
};

const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const REMOVE_PRODUCT_FROM_CART= "REMOVE_PRODUCT_FROM_CART"
const UPDATE_PRODUCT_FROM_CART= "UPDATE_PRODUCT_FROM_CART"
const SET_SUB_TOTAL= "SET_SUB_TOTAL"
const SET_CANTIDAD_PRODUCTOS= "SET_CANTIDAD_PRODUCTOS"

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
    case UPDATE_PRODUCT_FROM_CART:
        const updatedCart = state.productsCart.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        return {
          ...state,
          productsCart: updatedCart,
        };
    case SET_SUB_TOTAL:
      return {
        ...state,
        subTotal: action.payload,
      };
    case SET_CANTIDAD_PRODUCTOS:
      return {
        ...state,
        cantidadProductos: action.payload,
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

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT_FROM_CART,
  payload: product
})

export const setSubTotal = (subTotal) => ({
  type: SET_SUB_TOTAL,
  payload: subTotal,
});

export const setCantidadProductos = (cantidad) => ({
  type: SET_CANTIDAD_PRODUCTOS,
  payload:  cantidad,
});