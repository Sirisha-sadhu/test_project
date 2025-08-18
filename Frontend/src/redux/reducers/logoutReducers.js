// src/redux/reducers/logoutReducers.js

const initialState = {
    loggingOut: false,
    error: null,
};

const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGOUT_REQUEST':
            return {
                ...state,
                loggingOut: true,
                error: null,
            };
        case 'USER_LOGOUT_SUCCESS':
            return {
                ...state,
                loggingOut: false,
                error: null,
            };
        case 'USER_LOGOUT_FAILURE':
            return {
                ...state,
                loggingOut: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default logoutReducer;