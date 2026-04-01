import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTutorDashboardApi } from "../api/dashboard.api";

export const fetchTutorDashboard = createAsyncThunk(
    "dashboard/fetchTutor",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getTutorDashboardApi();
            console.log(response)
            if (response.success) {
                return response.data;
            }
            return rejectWithValue(response.message);
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch dashboard data");
        }
    }
);
