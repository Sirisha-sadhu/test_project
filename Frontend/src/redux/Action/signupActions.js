const loginUser = (userData) => async (dispatch) => {
        try {
            const response = await axios.post('/api/signup', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;

            if (response.ok) {
                dispatch({
                    type: 'SIGNUP_SUCCESS',
                    payload: data,
                });
            } else {
                dispatch({
                    type: 'SIGNUP_FAILURE',
                    payload: data.error,
                });
            }
        } catch (error) {
            dispatch({
                type: 'SIGNUP_FAILURE',
                payload: error.message,
            });
        }
};