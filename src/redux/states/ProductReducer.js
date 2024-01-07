const initialState = {
    productos: [],
    isProductSelected: false,
}


const SET_LIST_PRODUCTS = "SET_LIST_PRODUCTS";
const SET_IS_PRODUCT_SELECTED = "SET_IS_PRODUCT_SELECTED";

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LIST_PRODUCTS:
        case SET_IS_PRODUCT_SELECTED:
            return action.payload;
        default:
            return state;
    }
};

export const setProducts = (producto) => async (dispatch, getState) => {
    const { products } = getState();
    dispatch({
        type: SET_LIST_PRODUCTS,
        payload: { ...products, productos: producto }
    })
}

export const setIsProductSelected = (bool) => async (dispatch, getState) => {
    const { products } = getState();
    dispatch({
        type: SET_IS_PRODUCT_SELECTED,
        payload: { ...products, isProductSelected: bool }
    })
}