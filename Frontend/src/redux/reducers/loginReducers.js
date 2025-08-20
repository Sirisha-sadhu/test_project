const initialState = {
    loading: false,
    userInfo: null,
    error: null,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true, error: null };
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, error: null };
        case 'USER_LOGIN_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return { ...initialState };
        default:
            return state;
    }
};


export default loginReducer;