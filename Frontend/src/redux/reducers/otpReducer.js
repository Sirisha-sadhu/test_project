
const initialState = {
    loading: false,
    verified: false,
    error: null,
};


const otpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEND_OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'SEND_OTP_SUCCESS':
            return { ...state, loading: false, verified: true };
        case 'SEND_OTP_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'Verify_OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'VERIFY_OTP_SUCCESS':
            return { ...state, loading: false, verified: true };
        case 'VERIFY_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default otpReducer;