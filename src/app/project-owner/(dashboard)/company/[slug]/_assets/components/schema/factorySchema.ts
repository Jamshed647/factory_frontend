import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const factorySchema = z.object({
  name: validationSchemas.nameSchema(),
  address: validationSchemas.textSchema({ label: "Address", required: false }),
  phone: validationSchemas.phoneSchema(),
  status: validationSchemas.textSchema({
    label: "Factory Status",
    required: false,
  }),
  // email: validationSchemas.emailSchema({ required: false }),
  //  companyOwnerId: validationSchemas.textSchema({ label: "Company Owner Id" }),
});

export const factoryUpdateSchema = factorySchema
  // .omit({
  //   pinCode: true,
  //   confirmPinCode: true,
  // })
  .partial();

// --- TypeScript types inferred from schemas ---
export type FactoryFormType = z.infer<typeof factorySchema>;

export type FactoryUpdateFormType = z.infer<typeof factoryUpdateSchema>;
