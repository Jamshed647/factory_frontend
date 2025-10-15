import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { api } from "@/lib/api";
import { LoginFormType } from "@/components/auth/schema/login-schema";
import { showToast } from "@/components/common/TostMessage/customTostMessage";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "USER";
  permissions: string[]; // required
};

type RegisterInput = { name: string; email: string; password: string };
type AuthResponse = { token: string; user: User };

export function useAuth() {
  const router = useRouter();
  const qc = useQueryClient();
  const { isAuth, setToken, clearAuth } = useAuthStore();
  const { user, setUser, clearUser } = useUserStore();

  // Login
  const login = useMutation<AuthResponse, Error, LoginFormType>({
    mutationFn: async (data) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/owner/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Login failed" }));
        throw new Error(error.message || "Login failed");
      }

      return res.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      showToast("success", "Login Success");
      setToken(data.token);
      setUser(data.user);

      // Optional role-based redirect:
      // const routes = { ADMIN: "/admin", MANAGER: "/manager", USER: "/user" };
      // router.push(routes[data.user.role as keyof typeof routes]);
    },
    onError: (err) => showToast("error", err.message),
  });

  // Register
  const register = useMutation<AuthResponse, Error, RegisterInput>({
    mutationFn: ({ name, email, password }) =>
      api.register(name, email, password),
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      router.push("/");
    },
  });

  // Logout
  const logout = useMutation<void, Error>({
    mutationFn: api.logout,
    onSuccess: () => {
      clearAuth();
      clearUser();
      qc.clear();
      router.push("/login");
    },
  });

  return {
    user,
    isAuth,
    useLogin: login.mutate,
    register: register.mutate,
    logout: logout.mutate,
    isLoading: login.isPending || register.isPending,
  };
}

export function usePermission() {
  const { hasRole, hasPermission } = useUserStore();

  return {
    hasRole,
    hasPermission,
    isAdmin: () => hasRole("ADMIN"),
    isManager: () => hasRole("MANAGER"),
  };
}
