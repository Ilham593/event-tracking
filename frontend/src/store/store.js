import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducers from '../features/profile/profileSlice'
import { eventApi } from "../features/events/eventApi";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducers,
    [eventApi.reducerPath]: eventApi.reducer, // daftarkan reducer RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware), // daftarkan middleware RTK Query
});

export default store;
