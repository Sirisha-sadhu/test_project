import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('admin')

export const userDetails = createAsyncThunk(
  'users',
  async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/v1/admin/get-users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const updateUserKyc = createAsyncThunk(
  'kycUpdate',
  async({id, status})=>{
    try {
      const response = await axios.get(`http://localhost:8001/api/v1/admin/updateKyc/${id}/${status}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  } 
)


const initialState = {
  success: false,
  kycDocs: {},
  error: null,
  kycStatus: 'pending'
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.kycDocs = action.payload.kycDocs;
        state.success = true;
        state.error = null
      })
      
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(updateUserKyc.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUserKyc.fulfilled, (state, action) => {
        state.kycStatus = action.payload.kycStatus;
        state.success = true;
        state.error = null
      })
      
      .addCase(updateUserKyc.rejected, (state, action) => {
              state.loading = true;
              state.error = action.payload;
              state.success = false;
      })
  }
});


export default userSlice.reducer;
