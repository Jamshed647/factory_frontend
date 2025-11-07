import { FactoryFormType } from "../schema/companySchema";

export const factoryDefaultValue = (
  defaultValues: Partial<FactoryFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    address: defaultValues.address || "",
    //email: defaultValues.email || "",
    phone: defaultValues.phone || "",
    status: defaultValues.status || "",
    companyOwnerId: defaultValues.companyOwnerId || "",
  };
};
