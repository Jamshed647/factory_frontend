import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { LoginFormType } from "@/components/auth/schema/login-schema";
import { RegisterFormPayload } from "@/components/auth/schema/register-schema";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import type { User } from "@/types/user";
import { getAccessToken, getRole } from "@/utils/cookie/tokenHandler";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const portalName = pathname.split("/")[1];

  // Zustand stores
  const {
    isAuthenticated,
    isLoading: authLoading,
    redirectFrom,
    actions,
  } = useAuthStore();

  const { user, setUser, clearUser } = useUserStore();

  const accessToken = getAccessToken();
  const role = getRole();
  const target = redirectFrom || `/${portalName}/dashboard`;

  // Initialize auth and fetch user
  useEffect(() => {
    actions.initAuth();
  }, [actions]);

  // Fetch current user
  const { data: userData, error } = useQuery({
    queryKey: ["currentUser", accessToken],
    queryFn: async (): Promise<User> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/profile?role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch user");
      const json = await res.json();
      return json.data;
    },
    enabled: !!accessToken && !user,
    retry: false,
  });

  // Sync user state
  useEffect(() => {
    if (!accessToken) {
      actions.clearTokens();
      clearUser();
      return;
    }

    if (userData) setUser(userData);
    if (error) {
      actions.clearTokens();
      clearUser();
    }
  }, [userData, error, accessToken, setUser, clearUser, actions]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginFormType) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/authorization/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        },
      );

      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Login failed" }));
        throw new Error(error.message || "Login failed");
      }

      const json = await res.json();
      return {
        token: json.data.accessToken,
        refreshToken: json.data.refreshToken,
        role: credentials.role,
        user: json.data.user || { id: json.data.id, phone: json.data.phone },
      };
    },
    onSuccess: (data) => {
      actions.setTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        role: data.role || "",
      });

      // Wait for profile to load before redirecting
      queryClient.refetchQueries({ queryKey: ["currentUser"] }).then(() => {
        showToast("success", "Login successful");
        router.replace(target);
      });
    },
    onError: (err: Error) => showToast("error", err.message),
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormPayload) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/owner/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const error = await res
          .json()
          .catch(() => ({ message: "Registration failed" }));
        throw new Error(error.message || "Registration failed");
      }

      const json = await res.json();
      return json.data;
    },
    onSuccess: () => {
      showToast("success", "Registration Successful");
      router.push("/login");
    },
    onError: (err: Error) => showToast("error", err.message),
  });

  // Logout
  const signOut = () => {
    actions.clearTokens();
    clearUser();
    queryClient.clear();
    showToast("success", "Logged out successfully");
    router.push("/admin/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading: authLoading || loginMutation.isPending,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    signout: signOut,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
};
