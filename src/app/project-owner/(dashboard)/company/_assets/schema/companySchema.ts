import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const companySchema = z
  .object({
    name: validationSchemas.nameSchema(),
    address: validationSchemas.textSchema({ label: "Address" }),
    email: validationSchemas.emailSchema({ required: false }),
    phone: validationSchemas.phoneSchema(),
    pinCode: z.string().min(4, "Please enter a valid pincode."),
    confirmPinCode: z.string().min(4, "Please enter a valid pincode."),
  })
  .refine((data) => data.pinCode === data.confirmPinCode, {
    message: "Pincodes do not match",
    path: ["confirmPinCode"],
  });

export const companyUpdateSchema = companySchema
  .omit({
    pinCode: true,
    confirmPinCode: true,
  })
  .partial();

// --- TypeScript types inferred from schemas ---
export type CompanyFormType = z.infer<typeof companySchema>;

export type CompanyUpdateFormType = z.infer<typeof companyUpdateSchema>;
