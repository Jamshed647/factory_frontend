import { EmployeeFormType } from "../schema/employeeSchema";

export const employeeDefaultValue = (
  defaultValues: Partial<EmployeeFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    phone: defaultValues.phone || "",
    factoryId: defaultValues.factoryId || "",

    //  companyOwnerId: defaultValues.companyOwnerId || "",
  };
};
