import { z } from "zod";

export const generateLinkSchema = z.object({
  originalLink: z.string().trim().url("Please provide a valid URL"),
});