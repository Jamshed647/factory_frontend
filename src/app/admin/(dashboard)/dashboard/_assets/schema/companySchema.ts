import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const companySchema = z.object({
  pincode: z.string().min(4, "Please enter a valid pincode."),
  name: validationSchemas.nameSchema(),
  address: validationSchemas.textSchema({ label: "Address" }),
  email: validationSchemas.emailSchema({ required: false }),
  phone: validationSchemas.phoneSchema(),
  // pincode: validationSchemas.numberSchema({ label: "Pincode", min: 4, max: 4 }),
});

// --- TypeScript types inferred from schemas ---
export type CompanyFormType = z.infer<typeof companySchema>;

export type CompanyFormPayload = CompanyFormType &
  Partial<Pick<CompanyFormType, "pincode">>;
