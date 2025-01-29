import { z } from "zod";

export const passwordSchema = z.string().min(6).max(20);
export const emailSchema = z.string().email();

export const registerSchema = z.object({
  username: z.string().min(3).max(255),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  userAgent: z.string().optional(),
  email: emailSchema,
  password: passwordSchema,
});
