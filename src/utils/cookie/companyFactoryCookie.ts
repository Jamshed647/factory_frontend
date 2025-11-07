import Cookies from "js-cookie";

export const COOKIE_NAMES = {
  COMPANY_ID: "company_id",
  FACTORY_ID: "factory_id",
  SWITCH_OWNER_ID: "switch_owner_id",
  SWITCHED_ROLE: "switched_role",
} as const;

/* Save company ID in cookie */
export const setCompanyId = (companyId: string) => {
  Cookies.set(COOKIE_NAMES.COMPANY_ID, companyId, { expires: 7 });
};

/* Get company ID from cookie */
export const getCompanyId = (): string | null => {
  return Cookies.get(COOKIE_NAMES.COMPANY_ID) ?? null;
};

/* Save factory ID and switch owner ID in cookies */
export const setFactoryId = (
  factoryId: string,
  switchOwnerId: string,
  switchedRole: string,
) => {
  Cookies.set(COOKIE_NAMES.FACTORY_ID, factoryId, { expires: 7 });
  Cookies.set(COOKIE_NAMES.SWITCH_OWNER_ID, switchOwnerId, { expires: 7 });
  Cookies.set(COOKIE_NAMES.SWITCHED_ROLE, switchedRole, { expires: 7 });
};

/* Get factory ID from cookie */
export const getFactoryId = (): string | null => {
  return Cookies.get(COOKIE_NAMES.FACTORY_ID) ?? null;
};

/* Get switch owner ID from cookie */
export const getSwitchOwnerId = (): string | null => {
  return Cookies.get(COOKIE_NAMES.SWITCH_OWNER_ID) ?? null;
};

/* Get switched role from cookie */
export const getSwitchedRole = (): string | null => {
  return Cookies.get(COOKIE_NAMES.SWITCHED_ROLE) ?? null;
};

/* Clear company, factory, and switch owner IDs */
export const clearCompanyFactoryAndSwitchIds = () => {
  Cookies.remove(COOKIE_NAMES.COMPANY_ID);
  Cookies.remove(COOKIE_NAMES.FACTORY_ID);
  Cookies.remove(COOKIE_NAMES.SWITCH_OWNER_ID);
  Cookies.remove(COOKIE_NAMES.SWITCHED_ROLE);
};
