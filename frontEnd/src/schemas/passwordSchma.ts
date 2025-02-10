import { z } from "zod";


const password = z.string().min(6, {
  message: "Password must be at least 6 characters.",
});

export const passwordSchema = z.object({
  password: password,
});