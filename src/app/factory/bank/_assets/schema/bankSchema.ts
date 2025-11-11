import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema
export const bankSchema = z.object({
  name: validationSchemas.nameSchema({ label: "Full Name" }),
  factoryId: validationSchemas.textSchema({ label: "Factory Owner Id" }),
  accountNo: validationSchemas.textSchema({ label: "Account No" }),
  branchAddress: validationSchemas.textSchema({
    label: "Branch Address",
    required: false,
  }),
  balance: validationSchemas.numberSchema({
    label: "Balance",
    type: "number",
    required: false,
  }),
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
export type BankFormType = z.infer<typeof bankSchema>;

// export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
