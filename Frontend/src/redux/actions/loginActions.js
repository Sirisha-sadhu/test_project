import axios from "axios";


// Action types
export const USER_LOGIN_REQUEST = 'user login Request';
export const USER_LOGIN_SUCCESS = 'user login Success';
export const USER_LOGIN_FAILURE = 'user login Failure';
export const USER_LOGOUT = 'user/logoutRequest';

// Action creators
export const userLogin =  (userInfo) => async (dispatch) => {

    console.log(userInfo)
    dispatch({ type: USER_LOGIN_REQUEST });
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userInfo);
        console.log("User Login:", response.data);
        localStorage.setItem('login', JSON.stringify(response.data.token));
        dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
}

export const userLogout = () => async (dispatch) => {
        localStorage.removeItem("login");
        dispatch({ type: USER_LOGOUT });
}