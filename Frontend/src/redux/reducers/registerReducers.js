
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
            return { ...state, loading: false, success: action.payload.success, userInfo: action.payload.data };
        case 'REGISTER_FAILURE':
            return { ...state, loading: false, error: action.payload, success: false };
        case 'USER_PROFILE_SUCCESS':
            return { ...state, userInfo: action.payload.data, success: action.payload.success };
        case 'UPDATE_USER_PROFILE':
            return { ...state, userInfo: action.payload.data, success: action.payload.success };
        case 'USER_PROFILE_Failure':
            return { ...state, success: action.payload.success };

            
        default:
            return state;
    }
};

export default registerReducer;