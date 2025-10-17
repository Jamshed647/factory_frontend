import { useUserStore } from "@/store/userStore";
import type { UserRole } from "@/types/user";

export const usePermission = () => {
  const { hasRole, hasPermission, hasAnyRole, hasAllPermissions } =
    useUserStore();

  return {
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAllPermissions,

    // Optional convenience helpers
    isAdmin: () => hasRole("ADMIN" as UserRole),
    isManager: () => hasRole("MANAGER" as UserRole),
    isUser: () => hasRole("USER" as UserRole),

    canAccessAdmin: () => hasRole("ADMIN" as UserRole),
    canAccessManager: () => hasAnyRole(["ADMIN", "MANAGER"] as UserRole[]),
    canAccessUser: () => hasAnyRole(["ADMIN", "MANAGER", "USER"] as UserRole[]),
  };
};
