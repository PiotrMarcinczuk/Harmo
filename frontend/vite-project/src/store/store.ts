import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../counter/authSlice";
import loadReducer from "../counter/loadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    load: loadReducer,
  },
});

export default store;
