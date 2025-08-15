import axios from 'axios';

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Action Creators
export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

// Async Action (Thunk)
export const registerUser = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`http://localhost:8000/api/v1/user/register`, userData);
        localStorage.setItem('user', JSON.stringify(response.data.data)); // Store token if needed
        dispatch(registerSuccess(response.data));
    } catch (error) {
        console.log("Registration error:", error.response?.data);
        dispatch(registerFailure(error.response?.data?.message || error.message));
    }
};