import { createSlice } from "@reduxjs/toolkit";
import { fetchTutorDashboard } from "../thunk/dashboard.thunk";

interface DashboardState {
    tutorStats: {
       totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
    avgRating: number;
        isPremiumTutorEligible: boolean;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    tutorStats: null,
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutorDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTutorDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.tutorStats = action.payload;
            })
            .addCase(fetchTutorDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default dashboardSlice.reducer;
