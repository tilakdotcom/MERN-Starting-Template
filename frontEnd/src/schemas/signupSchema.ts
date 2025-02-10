import { z } from "zod";

const email = z.string().min(6, {
  message: "Email must be at least 6 characters.",
});
const password = z.string().min(6, {
  message: "Password must be at least 6 characters.",
});

export const signupSchma = z.object({
  username: z.string(),
  email: email,
  password: password,
});
