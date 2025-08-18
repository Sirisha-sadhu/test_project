import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/userReducers';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;