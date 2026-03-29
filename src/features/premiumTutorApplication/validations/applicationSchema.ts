import * as z from "zod";

export const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine(val => !isNaN(Date.parse(val)), "Invalid date"),
  nationalIdNumber: z.string().optional(),
  highestDegree: z.enum(["diploma", "bachelor", "master", "phd", "other"]),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  institution: z.string().min(2, "Institution is required"),
  graduationYear: z.coerce.number().int().min(1950).max(new Date().getFullYear()),
  subjectsTaught: z.array(z.string()).min(1, "At least one subject is required"),
  teachingLanguages: z.array(z.string()).min(1, "At least one language is required"),
  yearsOfExperience: z.coerce.number().min(0, "Years of experience cannot be negative"),
  experience: z.string().min(100, "Experience description must be at least 100 characters"),
});

export type ApplicationFormData = z.infer<typeof formSchema>;
