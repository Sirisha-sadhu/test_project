const initialState = {
    loading: false,
    user: null,
    error: null,
    success: false,
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                isAuthenticated: false,
            };
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
                success: true,
                isAuthenticated: true,
            };
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        case 'SIGNUP_PENDING':
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        default:
            return state;
    }
};

export default signupReducer;