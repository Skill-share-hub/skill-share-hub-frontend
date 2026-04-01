import axiosInstance from "../../../shared/services/axios";
import type {
  ApplicationsResponse,
  ApplicationFilters,
  ApplicationStats,
  Application,
} from "../types/application.types";

export async function fetchApplicationsApi(
  filters: ApplicationFilters
): Promise<ApplicationsResponse> {
  try {
    const res = await axiosInstance.get("/premium-application/admin/all", {
      params: {
        page: filters.page,
        limit: filters.limit,
        status: filters.status === "all" ? undefined : filters.status,
        search: filters.search || undefined,
        sort: filters.sort === "newest" ? "desc" : "asc",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch applications"
    );
  }
}

export async function fetchApplicationStatsApi(): Promise<ApplicationStats> {
  try {
    const res = await axiosInstance.get("/premium-application/admin/stats");
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch stats"
    );
  }
}

export async function fetchApplicationByIdApi(id: string): Promise<Application> {
  try {
    const res = await axiosInstance.get(`/premium-application/admin/${id}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch application details"
    );
  }
}

export async function approveApplicationApi(id: string): Promise<Application> {
  try {
    const res = await axiosInstance.patch(`/premium-application/admin/${id}/approve`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to approve application"
    );
  }
}

export async function rejectApplicationApi(id: string, rejectionReason: string): Promise<Application> {
  try {
    const res = await axiosInstance.patch(`/premium-application/admin/${id}/reject`, { rejectionReason });
    return res.data.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to reject application"
    );
  }
}