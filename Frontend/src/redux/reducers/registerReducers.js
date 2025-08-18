const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
};

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, error: null, success: false };
        case 'REGISTER_SUCCESS':
            return { ...state, loading: false, success: action.payload.success };
        case 'REGISTER_FAILURE':
            return initialState;
        default:
            return state;
    }
};

export default registerReducer;