import api from "../../../shared/services/axios";

export const getTutorDashboardApi = async () => {
    const response = await api.get("/dashboard/tutor");
    return response.data;
};
