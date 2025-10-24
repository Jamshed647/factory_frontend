import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  phone: z.string().min(10, "Invalid phone number"),
  pinCode: z.string().min(4, "Password must be at least 4 characters"),
  role: z.string(),
});

// --- TypeScript types inferred from schemas ---
export type LoginFormType = z.infer<typeof loginSchema>;
