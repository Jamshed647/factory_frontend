import { create } from "zustand";

interface AuthStore {
  token: string | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isAuth: false,

  setToken: (token) => {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    set({ token, isAuth: true });
  },

  clearAuth: () => {
    document.cookie = "token=; path=/; max-age=0";
    set({ token: null, isAuth: false });
  },
}));
