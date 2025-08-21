// src/redux/adminSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const adminLogin = createAsyncThunk(
  'admin/login',
  async(credentials, {rejectWithValue})=>{
    try{
      console.log(credentials)
      const response = await axios.post(`http://localhost:8001/api/v1/admin/login`, credentials)
      console.log(response.data)
      localStorage.setItem('admin', JSON.stringify(response.data?.token))
      return response.data
    }
    catch(err){
      console.log(err)
      return rejectWithValue(err?.response?.data?.message)
    }
  }
)



const initialState = {
  isAuthenticated: false,
  users: [],
  transactions: [],
  loading: false,
  success: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // loginAdmin: (state, action) => {
      
    //   state.isAuthenticated = true;
    //   state.adminInfo = { email: action.payload.email };
    // },
    // logoutAdmin: (state) => {
    //   state.isAuthenticated = false;
    //   state.adminInfo = null;
    // },
    // approveUser: (state, action) => {
    //   const user = state.users.find((u) => u.id === action.payload);
    //   if (user) user.status = "approved";
    // },
    // rejectUser: (state, action) => {
    //   const user = state.users.find((u) => u.id === action.payload);
    //   if (user) user.status = "rejected";
    // },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
    .addCase(adminLogin.fulfilled, (state, action)=>{
      state.loading = false,
      state.success = true,
      state.isAuthenticated = true;
    })
    .addCase(adminLogin.rejected, (state, action)=>{
      state.error = action.payload
      state.success = false
    })
  }
});

export const { loginAdmin, logoutAdmin, approveUser, rejectUser } =
  adminSlice.actions;

export default adminSlice.reducer;
