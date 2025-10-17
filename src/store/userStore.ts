import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User, UserRole } from "@/types/user";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;

  // Role & permission helpers
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      hasRole: (role) => {
        const roles = get().user?.roles ?? [];
        return roles.includes(role);
      },

      hasAnyRole: (roles) => {
        const userRoles = get().user?.roles ?? [];
        return roles.some((r) => userRoles.includes(r));
      },

      hasPermission: (permission) => {
        const permissions = get().user?.permissions ?? [];
        return permissions.includes(permission);
      },

      hasAllPermissions: (permissions) => {
        const userPermissions = get().user?.permissions ?? [];
        return permissions.every((p) => userPermissions.includes(p));
      },
    }),
    { name: "user-store" },
  ),
);
