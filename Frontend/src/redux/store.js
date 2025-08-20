import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducers';
import logoutReducer from './reducers/logoutReducers';
import loginReducer from './reducers/loginReducers';
import otpReducer from './reducers/otpReducer';
import kycReducers from './reducers/kycReducers';


const store = configureStore({
    reducer: {
        login: loginReducer,
        otp: otpReducer,
        register: registerReducer,
        logout: logoutReducer,
        kyc:kycReducers
    },
});

export default store;