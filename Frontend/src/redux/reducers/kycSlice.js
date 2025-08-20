import { createSlice } from "@reduxjs/toolkit";

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    poiFront: null,
    poiBack: null,
    poa: null,
  },
  reducers: {
    setFile: (state, action) => {
      const { key, file } = action.payload;
      state[key] = file;
    },
    clearFiles: (state) => {
      state.poiFront = null;
      state.poiBack = null;
      state.poa = null;
    },
  },
});

export const { setFile, clearFiles } = kycSlice.actions;
export default kycSlice.reducer;