import { z } from "zod";


const email = z.string().email().min(6, {
  message: "email  must be at least 6 characters.",
});

export const resetEmailSchema = z.object({
  email:email
});