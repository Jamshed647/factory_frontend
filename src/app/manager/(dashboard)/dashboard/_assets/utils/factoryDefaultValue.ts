import { FactoryFormType } from "../schema/companySchema";

export const factoryDefaultValue = (
  defaultValues: Partial<FactoryFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    address: defaultValues.address || "",
    contactInfo: defaultValues.contactInfo || "",
    //  companyOwnerId: defaultValues.companyOwnerId || "",
  };
};
