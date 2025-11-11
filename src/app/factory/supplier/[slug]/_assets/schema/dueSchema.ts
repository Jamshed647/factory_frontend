import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema

export const dueSchema = z
  .object({
    amount: validationSchemas.numberSchema({
      label: "Amount",
      type: "number",
    }),
    type: validationSchemas.textSchema({ label: "Type" }),
    transactionType: validationSchemas.textSchema({
      label: "Transaction Type",
    }),
    note: validationSchemas.textSchema({ label: "Note", required: false }),
    bankId: validationSchemas.textSchema({
      label: "Bank Account Id",
      required: false,
    }),
  })
  .refine(
    (data) => {
      // if transactionType is ONLINE, bankId must not be empty
      if (data.transactionType === "ONLINE") {
        return !!data.bankId;
      }
      return true;
    },
    {
      message: "Bank Account Id is required when Transaction Type is ONLINE",
      path: ["bankId"], // points to the field that should show the error
    },
  );

// export const employeeUpdateSchema = employeeSchema
//   .omit({
//     pinCode: true,
//     confirmPinCode: true,
//   })
//   .partial();

// --- TypeScript types inferred from schemas ---
export type DueFormType = z.infer<typeof dueSchema>;

// export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
