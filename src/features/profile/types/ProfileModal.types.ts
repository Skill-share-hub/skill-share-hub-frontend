export type UserRole = "student" | "tutor" | "premiumTutor"

export interface ProfileFormData {
  name: string
  avatarUrl: string
  avatarFile?: File | null
  email: string
  bio?: string
  skills?: string[]
  interests?: string[]
  experience?: string
}

export interface UpdateProfilePayload {
  name: string
  avatarUrl?: string
  avatarFile?: File | null
  studentProfile?: {
    bio?: string
    skills?: string[]
    interests?: string[]
  }
  tutorProfile?: {
    bio?: string
    skills?: string[]
    experience?: string
  }
}