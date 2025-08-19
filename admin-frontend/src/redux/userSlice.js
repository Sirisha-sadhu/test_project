import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  isEmailVerified: false,
  isPhoneVerified: false,
  kycStatus: "not_submitted", // "pending" | "approved" | "rejected"
  documents: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.userInfo = action.payload; // { name, email }
      state.isAuthenticated = true;
    },
    // logoutUser: (state) => {
    //   return initialState;
    // },
    logoutUser: () => initialState,

    verifyEmail: (state) => {
      state.isEmailVerified = true;
    },
    verifyPhone: (state) => {
      state.isPhoneVerified = true;
    },
    submitKyc: (state, action) => {
      state.kycStatus = "pending";
      state.documents = action.payload; // { poiFront, poiBack, poa }
    },
    approveKyc: (state) => {
      state.kycStatus = "approved";
    },
    rejectKyc: (state) => {
      state.kycStatus = "rejected";
    },
  },
});

export const {
  registerUser,
  logoutUser,
  verifyEmail,
  verifyPhone,
  submitKyc,
  approveKyc,
  rejectKyc,
} = userSlice.actions;

export default userSlice.reducer;
