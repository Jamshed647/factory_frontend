import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema

export const employeeSchema = z
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
    status: validationSchemas.textSchema({
      label: "Factory Status",
      required: false,
    }),
    factoryId: validationSchemas.textSchema({ label: "Factory Owner Id" }),
    pinCode: z.string().min(4).max(4),
    confirmPinCode: z.string().min(4).max(4),
  })
  .refine((data) => data.pinCode === data.confirmPinCode, {
    message: "Pin code does not match",
    path: ["confirmPinCode"],
  });

export const employeeUpdateSchema = employeeSchema
  .omit({
    pinCode: true,
    confirmPinCode: true,
  })
  .partial();

// --- TypeScript types inferred from schemas ---
export type EmployeeFormType = z.infer<typeof employeeSchema>;

export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
