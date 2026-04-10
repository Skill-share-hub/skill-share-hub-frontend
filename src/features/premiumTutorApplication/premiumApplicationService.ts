import api from "../../shared/services/axios";

export const submitPremiumApplication = async (formData: FormData) => {
  const response = await api.post("/premium-application", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getPremiumApplicationStatus = async () => {
    try {
        const response = await api.get("/premium-application/status");
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return { success: true, data: null };
        }
        throw error;
    }
};

export const deleteRejectedApplication = async (applicationId: string) => {
  const response = await api.delete(`/premium-application/${applicationId}`);
  return response.data;
};

export const resubmitPremiumApplication = async (applicationId: string, formData: FormData) => {
  const response = await api.put(`/premium-application/${applicationId}/resubmit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
