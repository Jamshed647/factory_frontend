import { FactoryFormType } from "../schema/companySchema";

export const factoryDefaultValue = (
  defaultValues: Partial<FactoryFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    address: defaultValues.address || "",
    //email: defaultValues.email || "",
    contactInfo: defaultValues.contactInfo || "",
    // factoryStatus: defaultValues.factoryStatus || "",
    //  companyOwnerId: defaultValues.companyOwnerId || "",
  };
};
