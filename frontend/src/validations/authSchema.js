import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),

  email: z.email("Please enter a valid email"),

  password: z.string().min(8, "Password must be at least 8 characters"),
});