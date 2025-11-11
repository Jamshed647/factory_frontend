import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const dueSchema = z.object({
  amount: validationSchemas.numberSchema({
    label: "Amount",
    type: "number",
  }),
  type: validationSchemas.textSchema({ label: "Type" }),
  transactionType: validationSchemas.textSchema({
    label: "Transaction Type",
  }),
  note: validationSchemas.textSchema({ label: "Note", required: false }),
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

// --- TypeScript types inferred from schemas ---
export type DueFormType = z.infer<typeof dueSchema>;

// export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
