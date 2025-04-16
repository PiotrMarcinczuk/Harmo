import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userToken: null,
  userRefreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setUserRefreshToken: (state, action) => {
      state.userRefreshToken = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = {};
      state.userToken = null;
      state.userRefreshToken = null;
    },
  },
});

export const { setUserInfo, setUserToken, clearUserInfo, setUserRefreshToken } =
  authSlice.actions;
export default authSlice.reducer;
