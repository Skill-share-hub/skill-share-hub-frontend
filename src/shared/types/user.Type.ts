export type UserRole = "student" | "tutor";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};