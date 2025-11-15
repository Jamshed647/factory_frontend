import { UserRole } from "@/types/user";

export const ROLE_GROUPS = {
  worker: ["MANAGER", "SALESMAN", "EMPLOYEE"],
  access: ["MANAGER", "PROJECT_OWNER", "COMPANY_OWNER"],
  admin: ["COMPANY_OWNER", "PROJECT_OWNER"],
} as const;

//  Utility: type guard for type-safe includes
const includesRole = <T extends readonly string[]>(
  list: T,
  role?: string,
): role is T[number] => !!role && (list as readonly string[]).includes(role);

export const isWorkerRole = (r?: UserRole) =>
  includesRole(ROLE_GROUPS.worker, r);

export const isAccessRole = (r?: UserRole) =>
  includesRole(ROLE_GROUPS.access, r);

export const isAdminRole = (r?: UserRole) => includesRole(ROLE_GROUPS.admin, r);

const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  PROJECT_OWNER: [
    "PROJECT_OWNER",
    "COMPANY_OWNER",
    "MANAGER",
    "EMPLOYEE",
    "SALESMAN",
  ],
  COMPANY_OWNER: ["COMPANY_OWNER", "MANAGER", "EMPLOYEE", "SALESMAN"],
  MANAGER: ["MANAGER", "EMPLOYEE", "SALESMAN"],
  EMPLOYEE: ["EMPLOYEE"],
  SALESMAN: ["SALESMAN"],
};

export const hasPermission = (role: UserRole, target: UserRole): boolean =>
  ROLE_HIERARCHY[role]?.includes(target) ?? false;
