import axios from 'axios';

// Adjust this to your backend URL

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


// Async Action (Thunk)
export const registerUser = (userData) => async (dispatch) => {
  
    try {
        dispatch({ type: REGISTER_REQUEST });
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData);
        localStorage.setItem('user_token', JSON.stringify(response.data.token)); // Store token if needed
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                success: response.data.success
            }
        });
    } catch (error) {
        console.log("Registration error:", error.response?.data);
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    };
};