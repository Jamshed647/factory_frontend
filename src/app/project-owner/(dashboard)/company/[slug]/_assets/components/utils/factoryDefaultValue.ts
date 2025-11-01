import { FactoryFormType } from "../schema/factorySchema";

export const factoryDefaultValue = (
  defaultValues: Partial<FactoryFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    address: defaultValues.address || "",
    phone: defaultValues.phone || "",
    status: defaultValues.status || "",
    // companyOwnerId: defaultValues.companyOwnerId || "",
    //email: defaultValues.email || "",
  };
};
