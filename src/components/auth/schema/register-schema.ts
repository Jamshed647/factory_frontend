import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "Please enter your first name."),
    lastName: z.string().optional(),
    email: validationSchemas.emailSchema(),
    phone: z.string().min(10, "Please enter a valid phone number."),
    //confirmPassword: validationSchemas.passwordSchema({ min: 4 }),
    pinCode: z.string().min(4, "Password must be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(4, "Password must be at least 6 characters long."),
  })
  .refine((data) => data.pinCode === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// --- TypeScript types inferred from schemas ---
export type RegisterFormType = z.infer<typeof registerSchema>;

export type RegisterFormPayload = Omit<RegisterFormType, "confirmPassword">;
