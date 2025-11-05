import { EmployeeFormType } from "../schema/employeeSchema";

export const employeeDefaultValue = (
  defaultValues: Partial<EmployeeFormType> = {},
) => {
  return {
    name: defaultValues?.name || "",
    // firstName: defaultValues.firstName || "",
    // lastName: defaultValues.lastName || "",
    phone: defaultValues.phone || "",
    factoryId: defaultValues.factoryId || "",
    pinCode: defaultValues.pinCode || "",
  };
};
