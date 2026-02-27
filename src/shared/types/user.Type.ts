export type UserRole = "student" | "tutor" | "premiumTutor" | "admin";
export type VerificationStatus =  | "pending"  | "verified"  | "rejected";
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
};