import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const managerSchema = z
  .object({
    name: validationSchemas.nameSchema(),
    phone: validationSchemas.numberSchema({
      label: "Contact Info",
      type: "string",
    }),
    factoryId: validationSchemas.textSchema({ label: "Factory Owner Id" }),
    pinCode: z.string().min(4).max(4),
    confirmPinCode: z.string().min(4).max(4),
  })
  .refine((data) => data.pinCode === data.confirmPinCode, {
    message: "Pin code does not match",
    path: ["confirmPinCode"],
  });

export const managerUpdateSchema = managerSchema
  .omit({
    pinCode: true,
    confirmPinCode: true,
  })
  .partial();

// --- TypeScript types inferred from schemas ---
export type ManagerFormType = z.infer<typeof managerSchema>;

export type ManagerUpdateFormType = z.infer<typeof managerUpdateSchema>;
