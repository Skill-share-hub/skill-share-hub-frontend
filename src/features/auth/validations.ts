import {z} from 'zod'

export const regSchema = z.object({
  name:z.string().min(4,"Name is too short!").trim().max(32,"Cannot exceed 32 characters"),
  email : z.string().min(1,"Email Required!").email("Enter a valid email.").max(32,"Cannot exceed 32 characters"),
  password : z
  .string()
  .regex(/[A-Z]/,"1 UpperCase Needed")
  .regex(/[a-z]/,"1 LowerCase Needed")
  .regex(/[1-9]/,"1 Number Needed")
  .min(8,"8 characters Needed")
  .max(32,"Cannot exceed 32 characters"),
  confirmPassword : z
  .string()
  .min(8,"Confirm your password.")
  .max(32,"Cannot exceed 32 characters")
}).
refine((data)=>data.confirmPassword === data.password,{
  message : "Passwords do not match",
  path : ["confirmPassword"]
});

export const logSchema = z.object({
  email:z
  .string()
  .min(1,"Email is required.")
  .max(50,"Cannot exceed 50 character")
  .email("Enter a valid email."),
  password : z
  .string()
  .regex(/[A-Z]/,"1 UpperCase Needed")
  .regex(/[a-z]/,"1 LowerCase Needed")
  .regex(/[1-9]/,"1 Number Needed")
  .min(8,"8 characters Needed")
  .max(32,"Cannot exceed 32 characters")
});

export type LogFormData = z.infer<typeof logSchema>
export type RegFormData = z.infer<typeof regSchema>