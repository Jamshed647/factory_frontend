import { z } from "zod";

// Register schema
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().min(10, "Invalid phone number"),
    password: z.string().min(4, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(4, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// --- TypeScript types inferred from schemas ---
export type RegisterFormType = z.infer<typeof registerSchema>;

export type RegisterFormPayload = Omit<RegisterFormType, "confirmPassword">;
