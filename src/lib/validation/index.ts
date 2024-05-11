import { z } from "zod";

export const signupValidation = z.object({
  name: z.string().min(2, { message: "name should be longer" }),
  username: z.string().min(2).max(50),
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export const signinValidation = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});
