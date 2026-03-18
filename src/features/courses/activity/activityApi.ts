import api from "../../../shared/services/axios";

export const getMyActivity = async (status: string) => {
  const res = await api.get(`/enrollments?status=${status}`);
  return res.data;
};