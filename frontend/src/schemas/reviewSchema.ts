import { z } from "zod";

export const reviewSchema = z.object({
    content: z
        .string()
        .trim()
        .min(3, "Review must be at least 3 characters")
        .max(3000, "Review cannot exceed 3000 characters"),
});

export type ReviewFormData = z.infer<
    typeof reviewSchema
>;