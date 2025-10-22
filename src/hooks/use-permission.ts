import { useUserStore } from "@/store/userStore";
import type { UserRole } from "@/types/user";

export const usePermission = () => {
  const { hasRole } = useUserStore();

  return {
    hasRole,
    // hasPermission,
    // hasAnyRole,
    // hasAllPermissions,
    // Optional convenience helpers
    isProjectOwner: () => hasRole("PROJECT_OWNER" as UserRole),
    isCompanyOwner: () => hasRole("COMPANY_OWNER" as UserRole),
    isManager: () => hasRole("MANAGER" as UserRole),
    isEmployee: () => hasRole("EMPLOYEE" as UserRole),
    isSalesman: () => hasRole("SALESMAN" as UserRole),

    canAccessAdmin: () => hasRole("ADMIN" as UserRole),
    // canAccessManager: () => hasAnyRole(["ADMIN", "MANAGER"] as UserRole[]),
    // canAccessUser: () => hasAnyRole(["ADMIN", "MANAGER", "USER"] as UserRole[]),
  };
};
