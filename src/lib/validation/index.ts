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

export const postValidation = z.object({
  caption: z.string().min(2).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "name should be longer" }),
  username: z.string().min(2).max(50),
  email: z.string().email({ message: "invalid email" }),
  bio: z.string(),
});
