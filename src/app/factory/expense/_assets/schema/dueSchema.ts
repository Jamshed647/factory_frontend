import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";
// Register schema
export const expenseSchema = z
  .object({
    factoryId: validationSchemas.textSchema({
      label: "Factory Id",
    }),
    title: validationSchemas.textSchema({ label: "Title" }),
    category: validationSchemas.textSchema({
      label: "Category",
      required: false,
    }),
    amount: validationSchemas.textSchema({
      label: "Amount",
    }),
    // type: validationSchemas.textSchema({ label: "Type" }),
    //  note: validationSchemas.textSchema({ label: "Note", required: false }),
    transactionType: validationSchemas.textSchema({
      label: "Transaction Type",
    }),
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

// --- TypeScript types inferred from schemas ---
export type ExpenseFormType = z.infer<typeof expenseSchema>;

// export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
