import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const supplierSchema = z.object({
  name: validationSchemas.nameSchema({ label: "Full Name" }),
  phone: validationSchemas.numberSchema({
    label: "Contact Info",
    type: "string",
  }),
  address: validationSchemas.textSchema({ label: "Address" }),
  initialDue: validationSchemas.numberSchema({
    label: "Initial Due",
    type: "number",
    required: false,
  }),
  factoryId: validationSchemas.textSchema({ label: "Factory Owner Id" }),
});
// .refine((data) => data.pinCode === data.confirmPinCode, {
//   message: "Pin code does not match",
//   path: ["confirmPinCode"],
// });

// export const employeeUpdateSchema = employeeSchema
//   .omit({
//     pinCode: true,
//     confirmPinCode: true,
//   })
//   .partial();

export const supplierUpdateSchema = supplierSchema
  .omit({
    factoryId: true,
  })
  .partial();

// --- TypeScript types inferred from schemas ---
export type SupplierFormType = z.infer<typeof supplierSchema>;

export type SupplierUpdateFormType = z.infer<typeof supplierUpdateSchema>;
