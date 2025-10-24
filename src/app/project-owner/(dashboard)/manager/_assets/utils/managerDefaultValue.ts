import { ManagerFormType } from "../schema/companySchema";

export const managerDefaultValue = (v?: Partial<ManagerFormType>) => ({
  name: v?.name ?? "",
  phone: v?.phone ?? "",
  factoryId: v?.factoryId ?? "",
  pinCode: v?.pinCode ?? "",
  confirmPinCode: v?.confirmPinCode ?? "",
});
