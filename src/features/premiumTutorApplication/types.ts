export interface DocumentInput {
  url: string;
  s3Key: string;
  fileType: "degree_certificate" | "id_proof" | "experience_letter" | "other";
  fileName: string;
}

export interface SubmitApplicationInput {
  tutorId: string;
  fullName: string;
  dateOfBirth: string; // ISO string for the form
  nationalIdNumber?: string;
  highestDegree: "diploma" | "bachelor" | "master" | "phd" | "other";
  fieldOfStudy: string;
  institution: string;
  graduationYear?: number;
  subjectsTaught: string[];
  teachingLanguages?: string[];
  yearsOfExperience: number;
  experience: string;
  documents: DocumentInput[];
}

export interface ApplicationStatusResponse {
  _id: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  documents: DocumentInput[];
}
