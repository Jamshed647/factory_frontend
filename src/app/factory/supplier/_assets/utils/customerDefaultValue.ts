import { SupplierFormType } from "../schema/customerSchema";

export const bankDefaultValue = (v: Partial<SupplierFormType>) => {
  return {
    name: v?.name ?? "",
    phone: v?.phone ?? "",
    factoryId: v?.factoryId ?? "",
    address: v?.address ?? "",
    initialDue: v?.initialDue ?? 0,
  };
};
