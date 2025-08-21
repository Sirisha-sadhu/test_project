import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
