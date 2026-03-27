import api from "../../../shared/services/axios";

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
