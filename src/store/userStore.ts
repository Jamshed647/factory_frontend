import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "ADMIN" | "MANAGER" | "USER";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[];
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  hasRole: (role: Role) => boolean;
  hasPermission: (perm: string) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      hasRole: (role) => get().user?.role === role,
      hasPermission: (perm) => get().user?.permissions.includes(perm) ?? false,
    }),
    { name: "user" },
  ),
);
