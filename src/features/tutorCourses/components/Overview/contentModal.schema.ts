import * as z from "zod";

export const quizQuestionSchema = z.object({
  question: z.string().min(4, "Question must be at least 4 characters").max(200),
  options: z
    .array(z.object({ value: z.string().min(1, "Option cannot be empty") }))
    .min(2, "At least 2 options required")
    .max(4, "Maximum 4 options"),
  answer: z.string().min(1, "Please select the correct answer"),
});

export const contentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  summary: z.string().min(20, "Summary must be at least 20 characters").max(500, "Summary is too long"),
  quizData: z.array(quizQuestionSchema),
});

export type ContentFormValues = z.infer<typeof contentSchema>;

export const makeDefaultQuestion = () => ({
  question: "",
  options: [{ value: "" }, { value: "" }],
  answer: "",
});
