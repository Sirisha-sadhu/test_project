// src/redux/adminSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const base_url = import.meta.env.VITE_ADMIN_URL

export const adminLogin = createAsyncThunk(
  'admin/login',
  async(credentials, {rejectWithValue})=>{
    try{
      console.log(credentials)
      const response = await axios.post(`${base_url}/admin/login`, credentials)
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
      state.success = true
    })
    .addCase(adminLogin.rejected, (state, action)=>{
      state.error = action.payload
      state.success = false
    })
  }
});

export default adminSlice.reducer;
