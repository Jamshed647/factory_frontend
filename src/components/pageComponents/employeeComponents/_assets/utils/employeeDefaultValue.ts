import { EmployeeFormType } from "../schema/employeeSchema";

export const employeeDefaultValue = (v: Partial<EmployeeFormType> = {}) => {
  return {
    firstName: v?.firstName ?? "",
    lastName: v?.lastName ?? "",
    email: v?.email ?? "",
    phone: v?.phone ?? "",
    factoryId: v?.factoryId ?? "",
    status: v?.status ?? "",
    pinCode: v?.pinCode ?? "",
    confirmPinCode: v?.confirmPinCode ?? "",
  };
};
