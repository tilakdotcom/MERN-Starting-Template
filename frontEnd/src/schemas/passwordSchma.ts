import { z } from "zod";


const password = z.string().min(8, {
  message: "Password must be at least 8 characters.",
});

export const passwordSchema = z.object({
  password: password,
});