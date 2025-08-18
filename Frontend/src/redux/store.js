import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducers';
import logoutReducer from './reducers/logoutReducers';
import loginReducer from './reducers/loginReducers';
import otpReducer from './reducers/otpReducer';


const store = configureStore({
    reducer: {
        login: loginReducer,
        otp: otpReducer,
        register: registerReducer,
        logout: logoutReducer,
    },
});

export default store;