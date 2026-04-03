export type ReportReason = 
  | "Inappropriate Content"
  | "Spam or Misleading"
  | "Offensive Language"
  | "Low Quality Content"
  | "Copyright Issue"
  | "Other";

export type ReportStatus = "pending" | "noticed" | "resolved";

export interface CourseReport {
  _id: string;
  courseId: {
    _id: string;
    title: string;
  };
  reportedBy: {
    _id: string;
    name: string;
    email: string;
  };
  reason: ReportReason;
  customReason?: string;
  status: ReportStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewReport {
  _id: string;
  reviewId: {
    _id: string;
    reviewText: string;
  };
  courseId: {
    _id: string;
    title: string;
  };
  reportedBy: {
    _id: string;
    name: string;
    email: string;
  };
  reason: ReportReason;
  customReason?: string;
  status: ReportStatus;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}
