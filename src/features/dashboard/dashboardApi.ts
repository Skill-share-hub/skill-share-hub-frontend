import api from "../../shared/services/axios";

export const getDashboardData=async()=>{
    const res = await api.get("/dashboard/student");
    return res.data;
};