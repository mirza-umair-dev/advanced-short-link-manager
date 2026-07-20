import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export const signInSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const emailSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
});
export const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters")
})