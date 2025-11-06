import { SalesmanFormType } from "../schema/salesmanSchema";

export const salesmanDefaultValue = (v: Partial<SalesmanFormType> = {}) => {
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
