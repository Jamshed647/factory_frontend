import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  setToken,
  getToken,
  clearToken,
  AuthTokens,
} from "@/utils/cookie/tokenHandler";

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  redirectFrom: string | null;

  actions: {
    setTokens: (tokens: AuthTokens) => void;
    clearTokens: () => void;
    setLoading: (loading: boolean) => void;
    initAuth: () => void;
    setRedirectFrom: (path: string | null) => void;
  };
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      accessToken: null,
      refreshToken: null,
      redirectFrom: null,

      actions: {
        //  Save tokens to both cookies & store
        setTokens: (tokens) => {
          setToken(tokens);
          set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAuthenticated: true,
          });
        },

        //  Clear tokens from cookies & store
        clearTokens: () => {
          clearToken();
          set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            redirectFrom: null,
          });
        },

        // 🔄 Toggle loading state
        setLoading: (loading) => set({ isLoading: loading }),

        // 🚀 Initialize from cookies on app load
        initAuth: () => {
          const tokens = getToken();
          set({
            accessToken: tokens?.accessToken ?? null,
            refreshToken: tokens?.refreshToken ?? null,
            isAuthenticated: !!tokens?.accessToken,
            isLoading: false,
          });
        },

        // 🧭 Store the "from" path for redirection after login
        setRedirectFrom: (path) => set({ redirectFrom: path }),
      },
    }),
    { name: "auth-store" },
  ),
);
