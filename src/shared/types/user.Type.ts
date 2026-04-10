// shared/types/user.Type.ts

export type UserRole = "student" | "tutor" | "premiumTutor" | "admin";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type StudentProfile = {
  bio: string;
  skills: string[];
  interests?: string[];
};

export type TutorProfile = {
  bio: string;
  skills: string[];
  experience?: string;
  totalCreditsEarned: number;
  monetizationEligible: boolean;
  premiumStatusDate?: string;
  ratingsAverage: number;
  reviewCount: number;
  earningsTotal: number;
  createdCourses?: any[];
};

export type User = {
  _id: string;
  name: string;
  avatarUrl?: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  isProfileCompleted?: boolean;
  studentProfile?: StudentProfile;
  tutorProfile?: TutorProfile;
  createdAt?: string;
  updatedAt?: string;
  savedCourses?: string[];
  enrolledCourses?: any[];
  usercreditBalance : number;
  userUpiId : string;
};