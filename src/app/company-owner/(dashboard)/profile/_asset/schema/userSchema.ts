import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const profileSchema = z.object({
  pincode: z.string().min(4, "Please enter a valid pincode."),
  name: validationSchemas.nameSchema(),
  address: validationSchemas.textSchema({ label: "Address" }),
  email: validationSchemas.emailSchema({ required: false }),
  phone: validationSchemas.phoneSchema(),
});

// --- TypeScript types inferred from schemas ---
export type ProfileFormType = z.infer<typeof profileSchema>;

// export type CompanyFormPayload = ProfileFormType &
//   Partial<Pick<ProfileFormType, "pincode">>;
