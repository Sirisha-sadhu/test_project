// src/redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  adminInfo: null,
  users: [], 
  transactions: [], 
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      
      state.isAuthenticated = true;
      state.adminInfo = { email: action.payload.email };
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.adminInfo = null;
    },
    approveUser: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) user.status = "approved";
    },
    rejectUser: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) user.status = "rejected";
    },
  },
});

export const { loginAdmin, logoutAdmin, approveUser, rejectUser } =
  adminSlice.actions;

export default adminSlice.reducer;
