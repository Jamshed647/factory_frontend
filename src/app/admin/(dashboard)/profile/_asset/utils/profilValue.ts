import { ProfileFormType } from "../schema/userSchema";

export const profileDefaultValue = (profile: Partial<ProfileFormType> = {}) => {
  return {
    pincode: profile.pincode || "",
    name: profile.name || "",
    address: profile.address || "",
    email: profile.email || "",
    phone: profile.phone || "",
  };
};
