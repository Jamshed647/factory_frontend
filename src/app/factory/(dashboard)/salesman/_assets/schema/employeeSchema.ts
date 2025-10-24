import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

// Register schema

export const employeeSchema = z
  .object({
    name: validationSchemas.nameSchema(),
    phone: validationSchemas.numberSchema({
      label: "Phone Number",
      type: "string",
    }),
    factoryId: validationSchemas.textSchema({
      label: "Factory Id",
      required: false,
    }),
    pinCode: validationSchemas.textSchema({ label: "Pin Code" }),
    confirmPinCode: validationSchemas.textSchema({ label: "Confirm Pin Code" }),
  })
  .refine((data) => data.pinCode === data.confirmPinCode, {
    message: "Pin Codes do not match",
    path: ["confirmPinCode"],
  });

export const employeeUpdateSchema = employeeSchema
  // .omit({
  //   pinCode: true,
  //   confirmPinCode: true,
  // })
  .partial();

// --- TypeScript types inferred from schemas ---
export type EmployeeFormType = z.infer<typeof employeeSchema>;

export type EmployeeUpdateFormType = z.infer<typeof employeeUpdateSchema>;
