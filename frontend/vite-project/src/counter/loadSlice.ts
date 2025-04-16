import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: true,
};

const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    setLoad: (state) => {
      state.load = true;
    },
    clearLoad: (state) => {
      state.load = false;
    },
  },
});

export const { setLoad, clearLoad } = loadSlice.actions;
export default loadSlice.reducer;
