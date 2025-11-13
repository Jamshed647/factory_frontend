import { BankFormType } from "../schema/bankSchema";

export const customerDefaultValue = (v: Partial<BankFormType>) => {
  return {
    name: v?.name ?? "",
    accountNo: v?.accountNo ?? "",
    branch: v?.branch ?? "",
    factoryId: v?.factoryId ?? "",
    balance: v?.balance ?? 0,
  };
};
