import api from "../../../shared/services/axios";

export interface PurchaseSummaryResponse {
  coursePrice: number;
  userCredits: number;
  creditsApplied: number;
  paymentAmount: number;
  paymentRequired: boolean;
}

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentPayload {
  courseId: string;
  creditsUsed: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const purchaseApi = {
  fetchSummary: async (courseId: string, paymentMethod: "credit" | "payment" | "credit_payment") => {
    const response = await api.post<{ success: boolean; message: string; data: PurchaseSummaryResponse }>(
      `/payments/${courseId}/summary`,
      { paymentMethod }
    );
    return response.data.data;
  },

  createPaymentOrder: async (courseId: string) => {
    const response = await api.post<RazorpayOrderResponse>(
      `/payments/course/order`,
      { courseId }
    );
    return response.data;
  },

  purchaseWithCredits: async (courseId: string) => {
    const response = await api.post<{ success: boolean; message: string }>(
      `/payments/${courseId}/credits`
    );
    return response.data;
  },

  verifyPayment: async (payload: VerifyPaymentPayload) => {
    const response = await api.post<{ success: boolean; message: string }>(
      `/payments/course/verify`,
      payload
    );
    return response.data;
  }
};
