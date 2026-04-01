import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../shared/services/axios';

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/wallet?refresh=true');
      return data.data;
    } catch (err: unknown) {
      const error = err as Error & { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || "Failed to fetch wallet");
    }
  }
);

interface WalletState {
  creditBalance: number;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  creditBalance: 0,
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateCreditBalance: (state, action) => {
      state.creditBalance = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.creditBalance = action.payload?.creditBalance || 0;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { updateCreditBalance } = walletSlice.actions;

export default walletSlice.reducer;
