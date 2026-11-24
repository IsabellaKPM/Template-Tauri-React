import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(255),
    username: z
      .string()
      .trim()
      .min(3, "The username must be at least 3 characters long")
      .max(255),
    email: z.email({
      message: "Invalid email, please enter a valid email address",
    }),
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(255),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
