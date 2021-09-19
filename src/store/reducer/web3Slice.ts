import { createSlice } from "@reduxjs/toolkit";

export const web3Slice = createSlice({
  name: "web3",
  initialState: {
    value: null,
  },
  reducers: {
    setWeb3Store: (state, action) => {
      state.value = action.payload;
    },
    clearWeb3: (state, action) => {
      state.value = null;
    },
  },
});

export const { setWeb3Store, clearWeb3 } = web3Slice.actions;

export default web3Slice.reducer;
