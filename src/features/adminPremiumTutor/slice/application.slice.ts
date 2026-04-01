import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchApplicationsApi,
  fetchApplicationStatsApi,
} from "../services/application.service";
import type {
  Application,
  ApplicationFilters,
  ApplicationMeta,
  ApplicationStats,
} from "../types/application.types";

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async (filters: ApplicationFilters, { rejectWithValue }) => {
    try {
      return await fetchApplicationsApi(filters);
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const fetchApplicationStats = createAsyncThunk(
  "applications/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchApplicationStatsApi();
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

// ─── State ───────────────────────────────────────────────────────────────────

interface ApplicationState {
  applications: Application[];
  meta: ApplicationMeta;
  stats: ApplicationStats;
  filters: ApplicationFilters;
  loading: boolean;
  statsLoading: boolean;
  error: string | null;
}

const initialFilters: ApplicationFilters = {
  search: "",
  status: "all",
  sort: "newest",
  page: 1,
  limit: 5,
};

const initialState: ApplicationState = {
  applications: [],
  meta: { total: 0, page: 1, limit: 5, totalPages: 1, hasNextPage: false, hasPrevPage: false },
  stats: { total: 0, pending: 0, approved: 0, rejected: 0 },
  filters: initialFilters,
  loading: false,
  statsLoading: false,
  error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const applicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.filters.page = 1;
    },
    setStatusFilter(state, action: PayloadAction<ApplicationFilters["status"]>) {
      state.filters.status = action.payload;
      state.filters.page = 1;
    },
    setSortFilter(state, action: PayloadAction<ApplicationFilters["sort"]>) {
      state.filters.sort = action.payload;
      state.filters.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    resetFilters(state) {
      state.filters = initialFilters;
    },
  },
  extraReducers: (builder) => {
    // fetchApplications
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications;
        state.meta = action.payload.meta;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchApplicationStats
    builder
      .addCase(fetchApplicationStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchApplicationStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchApplicationStats.rejected, (state) => {
        state.statsLoading = false;
      });
  },
});

export const { setSearch, setStatusFilter, setSortFilter, setPage, resetFilters } =
  applicationSlice.actions;

export default applicationSlice.reducer;