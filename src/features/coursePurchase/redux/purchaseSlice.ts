import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { purchaseApi } from "../services/purchaseApi";
import type { VerifyPaymentPayload } from "../services/purchaseApi";

type PaymentMethodType = "credit" | "payment" | "credit_payment";

interface PurchaseState {
  selectedPaymentMethod: PaymentMethodType;
  order: any | null;
  loading: boolean;
  paymentStatus: "idle" | "processing" | "success" | "failed";
  error: string | null;
  showSuccessModal: boolean;
  purchasedCourse: any | null;
}

const initialState: PurchaseState = {
  selectedPaymentMethod: "credit",
  order: null,
  loading: false,
  paymentStatus: "idle",
  error: null,
  showSuccessModal: false,
  purchasedCourse: null,
};

export const createPaymentOrder = createAsyncThunk(
  "purchase/createOrder",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await purchaseApi.createPaymentOrder(courseId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create order");
    }
  }
);

export const purchaseWithCreditsOnly = createAsyncThunk(
  "purchase/creditsOnly",
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await purchaseApi.purchaseWithCredits(courseId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to process credit purchase");
    }
  }
);

export const verifyRazorpayPayment = createAsyncThunk(
  "purchase/verifyPayment",
  async (payload: VerifyPaymentPayload, { rejectWithValue }) => {
    try {
      const response = await purchaseApi.verifyPayment(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Payment verification failed");
    }
  }
);

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<PaymentMethodType>) => {
      state.selectedPaymentMethod = action.payload;
    },
    setPurchaseSuccess: (state, action: PayloadAction<any>) => {
      state.showSuccessModal = true;
      state.purchasedCourse = action.payload;
      state.paymentStatus = "success";
    },
    closeSuccessModal: (state) => {
      state.showSuccessModal = false;
      state.purchasedCourse = null;
    },
    resetPurchaseState: (state) => {
      state.selectedPaymentMethod = "credit";
      state.order = null;
      state.loading = false;
      state.paymentStatus = "idle";
      state.error = null;
      // Note: We don't necessarily reset the modal here if we want it to persist across remounts
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createPaymentOrder.pending, (state) => {
        state.loading = true;
        state.paymentStatus = "processing";
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload as string;
      })
      // Credit Purchase
      .addCase(purchaseWithCreditsOnly.pending, (state) => {
        state.loading = true;
        state.paymentStatus = "processing";
        state.error = null;
      })
      .addCase(purchaseWithCreditsOnly.fulfilled, (state) => {
        state.loading = false;
        state.paymentStatus = "success";
      })
      .addCase(purchaseWithCreditsOnly.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload as string;
      })
      // Verify Payment
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
        state.paymentStatus = "processing";
        state.error = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentStatus = "success";
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPaymentMethod, setPurchaseSuccess, closeSuccessModal, resetPurchaseState } = purchaseSlice.actions;
export default purchaseSlice.reducer;
