import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../../shared/types/user.Type";
import { fetchUserProfile, updateUserProfile } from "../thunk/profile.thunk";

interface ProfileState {
    profile: User | null;
    loading: boolean;
    updating: boolean;      
    error: string | null;
    updateError: string | null;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    updating: false,
    error: null,
    updateError: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        clearProfileErrors(state) {
            state.error = null;
            state.updateError = null;
        },
    },
    extraReducers: (builder) => {
        // ── Fetch ──────────────────────────────────────────────────────────────
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? null;
            })

            // ── Update ─────────────────────────────────────────────────────────────
            .addCase(updateUserProfile.pending, (state) => {
                state.updating = true;
                state.updateError = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.updating = false;
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.updating = false;
                state.updateError = action.payload ?? null;
            });
    },
});

export const { clearProfileErrors } = profileSlice.actions;
export default profileSlice.reducer;