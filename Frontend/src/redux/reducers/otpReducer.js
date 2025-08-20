
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
            return { ...state, loading: false };
        case 'SEND_OTP_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'Verify_OTP_REQUEST':
            return { ...state, loading: true, error: null };
        case 'VERIFY_OTP_SUCCESS':
            return { ...state, loading: false, verified: action.payload.success };
        case 'VERIFY_FAILURE':
            return { ...state, loading: false, error: action.payload };

        case 'RESET_OTP_STATE':
            return {...initialState}
        default:
            return state;
    }
};


export default otpReducer;