import { z } from "zod";


const token = z.string().min(6, {
  message: "token / code  must be at least 6 characters.",
});

export const verifyTokenSchema = z.object({
  token:token
});