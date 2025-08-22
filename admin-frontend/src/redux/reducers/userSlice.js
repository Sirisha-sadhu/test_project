
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:8001/api/v1";

const token = JSON.parse(localStorage.getItem('admin'))

export const userDetails = createAsyncThunk(
  'users',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/get-users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
);

export const updateUserKyc = createAsyncThunk(
  'kycUpdate',
  async({id, status}, {getState})=>{
    try {
      const response = await axios.put(`${BASE_URL}/admin/updateKyc/${id}`,{status },{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const state = getState();

      const updateKycDocs = state.user.kycDocs.map((doc) => {
        if (doc._id === id) { 
          return { ...doc, kycStatus: status };
        }
        return doc;
      });
      console.log(response.data)
      return updateKycDocs;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  } 
)


const initialState = {
  success: false,
  kycDocs: [],
  error: null,
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
        state.kycDocs = action.payload;
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

