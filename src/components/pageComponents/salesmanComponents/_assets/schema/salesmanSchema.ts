import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema

export const salesmanSchema = z
  .object({
    firstName: validationSchemas.nameSchema({ label: "First Name" }),
    lastName: validationSchemas.nameSchema({
      label: "Last Name",
      required: false,
    }),
    email: validationSchemas.emailSchema({
      label: "Email bas bal",
      required: false,
    }),
    phone: validationSchemas.numberSchema({
      label: "Contact Info",
      type: "string",
    }),
    status: validationSchemas.textSchema({ label: "Factory Status" }),
    factoryId: validationSchemas.textSchema({ label: "Factory Owner Id" }),
    pinCode: z.string().min(4).max(4),
    confirmPinCode: z.string().min(4).max(4),
  })
  .refine((data) => data.pinCode === data.confirmPinCode, {
    message: "Pin code does not match",
    path: ["confirmPinCode"],
  });

export const salesmanUpdateSchema = salesmanSchema
  .omit({
    pinCode: true,
    confirmPinCode: true,
  })
  .partial();

// --- TypeScript types inferred from schemas ---
export type SalesmanFormType = z.infer<typeof salesmanSchema>;

export type SalesmanUpdateFormType = z.infer<typeof salesmanUpdateSchema>;
