import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../../../shared/types/user.Type";
import { getProfile, updateUserProfileApi } from "../api/profile.api";
import type { UpdateUserProfileDto } from "../api/profile.api";

// ─── Fetch Profile ────────────────────────────────────────────────────────────
export const fetchUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
    "profile/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProfile();
            
            return data as User;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
        }
    }
);

// ─── Update Profile ───────────────────────────────────────────────────────────
export const updateUserProfile = createAsyncThunk<User, UpdateUserProfileDto, { rejectValue: string }>(
    "profile/updateUserProfile",
    async (payload, { rejectWithValue }) => {
        try {
            const data = await updateUserProfileApi(payload);
            return data as User;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile");
        }
    }
);
