import { CompanyFormType } from "../schema/companySchema";

export const companyDefaultValue = (
  defaultValues: Partial<CompanyFormType> = {},
) => {
  return {
    name: defaultValues.name || "",
    address: defaultValues.address || "",
    email: defaultValues.email || "",
    phone: defaultValues.phone || "",
    pinCode: defaultValues.pinCode || undefined,
    confirmPinCode: defaultValues.confirmPinCode || undefined,
  };
};
