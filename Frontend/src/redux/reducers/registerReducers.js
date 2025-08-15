const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { ...state, loading: true, error: null, success: false };
        case 'USER_REGISTER_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, success: true };
        case 'USER_REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'USER_REGISTER_RESET':
            return initialState;
        default:
            return state;
    }
};

export default registerReducer;