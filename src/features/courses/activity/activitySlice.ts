import { createSlice } from "@reduxjs/toolkit";
import { fetchActivity } from "./activityThunk";

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    data: null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; 
      })
      .addCase(fetchActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default activitySlice.reducer;