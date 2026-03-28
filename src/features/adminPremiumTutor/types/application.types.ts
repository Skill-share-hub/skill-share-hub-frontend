export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface TutorId {
  _id: string;
  name: string;
  email: string;
  profilePhoto?: string;
}

export interface ApplicationDocument {
  url: string;
  fileName: string;
  fileType: string;
  s3Key?: string;
}

export interface Application {
  _id: string;
  tutorId: TutorId;
  fullName: string;
  dateOfBirth: string;
  nationalIdNumber?: string;
  
  highestDegree: "diploma" | "bachelor" | "master" | "phd" | "other";
  fieldOfStudy: string;
  institution: string;
  graduationYear?: number;
  
  subjectsTaught: string[];
  teachingLanguages: string[];
  yearsOfExperience: number;
  experience: string; // bio/description
  
  documents: ApplicationDocument[];
  status: ApplicationStatus;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface ApplicationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApplicationsResponse {
  success: boolean;
  applications: Application[];
  meta: ApplicationMeta;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export type SortOrder = "newest" | "oldest";

export interface ApplicationFilters {
  search: string;
  status: ApplicationStatus | "all";
  sort: SortOrder;
  page: number;
  limit: number;
}