import { z } from "zod";
import { UserRoles } from "@/features/auth/enums/userRoles";
import { UserStatus } from "@/features/auth/enums/userStatus";

const baseUserSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(255),
  username: z
    .string()
    .trim()
    .min(3, "The username must be at least 3 characters long")
    .max(255),
  email: z.email({
    message: "Invalid email, please enter a valid email address",
  }),
  role: z.enum(UserRoles),
  status: z.enum(UserStatus),
});

export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(255),
});

export const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .max(255)
    .refine(
      (value) => value === "" || value.length >= 8,
      "The password must be at least 8 characters long",
    ),
});

export type UserFormValues = z.infer<typeof createUserSchema>;
