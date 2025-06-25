import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "../services/apiSlice";
import profileReducers from '../features/profile/profileSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducers,
    [apiSlice.reducerPath]: apiSlice.reducer, // daftarkan reducer RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // daftarkan middleware RTK Query
});

export default store;
