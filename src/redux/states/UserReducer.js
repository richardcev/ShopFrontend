import axios from "axios";

const initialState = {
    usuarios: false,
    isAuthenticated: false,
    access: "",
    refresh: "",
}


const REGISTER_USER = "REGISTER_USER";
const AUTHENTICATED_USER = "AUTHENTICATED_USER";
const ACCESS_TOKEN_USER = "ACCES_TOKEN_USER"
const REFRESH_TOKEN_USER = "REFRESH_TOKEN_USER"

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return action.payload;
        case AUTHENTICATED_USER:
            return action.payload;
        case ACCESS_TOKEN_USER:
            return action.payload;
        case REFRESH_TOKEN_USER:
            return action.payload;
        default:
            return state;
    }
};

export const registerUser = (bool) => async (dispatch, getState) => {
    const { users } = getState();
    dispatch({
        type: REGISTER_USER,
        payload: { ...users, usuarios: bool }
    })
}

export const isAuthenticatedUser = (bool) => async (dispatch, getState) => {
    const { users } = getState();
    dispatch({
        type: AUTHENTICATED_USER,
        payload: { ...users, isAuthenticated: bool }
    })
}

export const setAccessTokenUser = (token) => async (dispatch, getState) => {
    const { users } = getState();
    dispatch({
        type: ACCESS_TOKEN_USER,
        payload: { ...users, access: token }
    })
}

export const setRefreshTokenUser = (token) => async (dispatch, getState) => {
    const { users } = getState();
    dispatch({
        type: REFRESH_TOKEN_USER,
        payload: { ...users, refresh: token }
    })
}