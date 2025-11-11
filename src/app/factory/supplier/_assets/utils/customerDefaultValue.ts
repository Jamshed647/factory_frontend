import { CustomerFormType } from "../schema/customerSchema";

export const customerDefaultValue = (v: Partial<CustomerFormType>) => {
  return {
    name: v?.name ?? "",
    phone: v?.phone ?? "",
    factoryId: v?.factoryId ?? "",
    address: v?.address ?? "",
    initialDue: v?.initialDue ?? 0,
  };
};
