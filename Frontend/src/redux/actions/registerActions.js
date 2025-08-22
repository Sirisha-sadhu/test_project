import axios from 'axios';

// Adjust this to your backend URL

// Action Types
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const USER_PROFILE_FAILURE = 'USER_PROFILE_FAILURE';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';


// Async Action (Thunk)
export const registerUser = (userData) => async (dispatch) => {
  
    try {
        dispatch({ type: REGISTER_REQUEST });
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, userData);
        localStorage.setItem('register', JSON.stringify(response.data.token));
        // Store token if needed
        if (response.data.success) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            
        }
        else{
            dispatch({
                type: REGISTER_FAILURE,
                payload: response.data.message || "Registration failed",
            });
        }
    } catch (error) {
        console.log("Registration error:", error.response?.data);
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    };
};

export const fetchUserProfile = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('register'));
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/my-profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("User profile fetched:", response.data);
        if(response.data.success){
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: response.data,
            });
        }
        else{
            dispatch({
                type: USER_PROFILE_FAILURE,
                payload: response.data.message
            })
        }
        
    } catch (error) {
        console.log("Error fetching user profile:", error);
        dispatch({
            type: USER_PROFILE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
}

