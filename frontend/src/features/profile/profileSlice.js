import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as profileApi from "./profileApi";
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await profileApi.getProfile();
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfiles(state) {
      state.user = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'failed fetch progfile';
      });
  },
});

export const { clearProfiles } = profileSlice.actions;
export default profileSlice.reducer;
