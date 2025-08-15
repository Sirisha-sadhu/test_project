import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './reducers/registerReducers';
import logoutReducer from './reducers/logoutReducers';
import loginReducer from './reducers/loginReducers';


const store = configureStore({
    reducer: {
        login: loginReducer,
        register: registerReducer,
        logout: logoutReducer,
    },
});

export default store;