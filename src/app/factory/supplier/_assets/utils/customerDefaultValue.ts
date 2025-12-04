import { CustomerFormType } from "../schema/customerSchema";

export const bankDefaultValue = (v: Partial<CustomerFormType>) => {
  return {
    name: v?.name ?? "",
    phone: v?.phone ?? "",
    factoryId: v?.factoryId ?? "",
    address: v?.address ?? "",
    initialDue: v?.initialDue ?? 0,
  };
};
