import { ManagerFormType } from "../schema/managerSchema";

export const managerDefaultValue = (v?: Partial<ManagerFormType>) => ({
  firstName: v?.firstName ?? "",
  lastName: v?.lastName ?? "",
  email: v?.email ?? "",
  phone: v?.phone ?? "",
  factoryId: v?.factoryId ?? "",
  pinCode: v?.pinCode ?? "",
  confirmPinCode: v?.confirmPinCode ?? "",
});
