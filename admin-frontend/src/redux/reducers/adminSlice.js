// src/redux/adminSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:8001/api/v1";

// ========== ADMIN LOGIN ==========
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/login`,
        credentials
      );

      // save token in localStorage
      localStorage.setItem("admin", response.data?.otherData?.token);

      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

// ========== UPDATE USER KYC ==========
export const updateUserKyc = createAsyncThunk(
  "admin/updateKyc",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("admin"); // get token from storage

      const response = await axios.get(
        `${BASE_URL}/admin/updateKyc/${id}/${status}

`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "KYC update failed");
    }
  }
);

// ========== SLICE ==========
const initialState = {
  isAuthenticated: false,
  adminInfo: null,
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
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.adminInfo = null;
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    // --- Admin login cases ---
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.adminInfo = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });

    // --- KYC update cases ---
    builder
      .addCase(updateUserKyc.fulfilled, (state) => {
        state.success = true;
        state.loading = false;

      })
      .addCase(updateUserKyc.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
