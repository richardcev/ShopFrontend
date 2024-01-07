import axios from "axios";

const initialState = {
    usuarios: false,
}


const REGISTER_USER = "REGISTER_USER";

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
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