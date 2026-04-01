import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../shared/services/axios";

export const switchRole = createAsyncThunk(
    "user/switchRole",
    async ({ role }: { role: string }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/users/role`, { role });
            if (response.data.success) {
                toast.success(`Role updated to ${role}`);
                return response.data;
            }
            return rejectWithValue(response.data.message || "Failed to update status");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to update status");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { rejectWithValue }) => {
        try {
            await api.post(`/auth/logout`);
            return true;
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);