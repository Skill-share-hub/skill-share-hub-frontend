import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMyActivity } from "./activityApi";
import handleError from "../../../shared/services/handleError";

export const fetchActivity = createAsyncThunk(
  "activity/fetch",
  async (status: string = "active", { rejectWithValue }) => {
    try {
      return await getMyActivity(status);
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);