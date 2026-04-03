import api from "../../../shared/services/axios";
import type { ReportReason, ReportStatus } from "../types/report.types";

export const reportService = {
  // User Reporting
  reportCourse: async (courseId: string, reason: ReportReason, customReason?: string) => {
    const { data } = await api.post("/reports/course", {
      courseId,
      reason,
      customReason,
    });
    return data;
  },

  reportReview: async (reviewId: string, courseId: string, reason: ReportReason, customReason?: string) => {
    const { data } = await api.post("/reports/review", {
      reviewId,
      courseId,
      reason,
      customReason,
    });
    return data;
  },

  checkCourseReport: async (courseId: string) => {
    const { data } = await api.get(`/reports/course/${courseId}/check`);
    return data.data?.hasReported || false;
  },

  checkReviewReport: async (reviewId: string) => {
    const { data } = await api.get(`/reports/review/${reviewId}/check`);
    return data.data?.hasReported || false;
  },

  // Admin Management
  getAdminCourseReports: async () => {
    const { data } = await api.get("/admin/reports/courses");
    return data;
  },

  getAdminReviewReports: async () => {
    const { data } = await api.get("/admin/reports/reviews");
    return data;
  },

  updateReportStatus: async (reportId: string, status: ReportStatus, adminNote?: string) => {
    const { data } = await api.patch(`/admin/reports/${reportId}`, {
      status,
      adminNote,
    });
    return data;
  },
};
