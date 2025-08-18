import axios from 'axios';

const token = JSON.parse(localStorage.getItem("user_token"));

// Action Types
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_EMAIL_OTP_FAILURE';

export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

// Send OTP to email
export const sendEmailOtp = () => async (dispatch) => {
    dispatch({ type: SEND_OTP_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/otp/send-email`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Email OTP sent response:", response);
        dispatch({ type: SEND_OTP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: SEND_OTP_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Verify OTP
export const verifyEmailOtp = (otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/otp/verify-email`, { otp }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Email OTP verification response:", response.data.data);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const sendPhoneOtp = () => async (dispatch) => {
    dispatch({ type: SEND_OTP_REQUEST });
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/otp/send-otp-phone`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Phone OTP sent response:", response);
        dispatch({ type: SEND_OTP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: SEND_OTP_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Verify OTP
export const verifyPhoneOtp = (otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/otp/verify-otp-phone`, { otp }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Phone OTP verification response:", response.data.data);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: VERIFY_OTP_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};