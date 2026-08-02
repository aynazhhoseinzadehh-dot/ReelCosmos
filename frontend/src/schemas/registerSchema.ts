import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50),

    email: z
        .email("Invalid email")
        .max(100),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),

    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50),
});

export type RegisterFormData = z.infer<
    typeof registerSchema
>;