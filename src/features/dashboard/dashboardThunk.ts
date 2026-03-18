import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardData } from "./dashboardApi";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, thunkAPI) => {
    try {
      return await getDashboardData();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);