import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { LoginFormType } from "@/components/auth/schema/login-schema";
import { RegisterFormPayload } from "@/components/auth/schema/register-schema";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import type { User } from "@/types/user";
import { getAccessToken, getRefreshToken } from "@/utils/cookie/tokenHandler";
import { calcGeneratorDuration } from "framer-motion";

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

/**
 * useAuth Hook
 * -----------------------
 * Handles login, registration, logout, and current user management
 * using React Query + Zustand store for persistent state.
 */
export const useAuth = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const portalName = pathname.split("/")[1];

  // Zustand store actions and states
  const {
    isAuthenticated,
    isLoading: authLoading,
    actions: { setTokens, clearTokens, setLoading, initAuth },
    redirectFrom,
  } = useAuthStore();

  const target = redirectFrom || `/${portalName}/dashboard`;
  const { user, setUser, clearUser } = useUserStore();

  // Initialize authentication state from cookies on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  /**
   * Fetch current logged-in user
   * --------------------------------
   * Triggered automatically if user is authenticated and not yet loaded.
   */
  // const currentUserQuery = useQuery<User, Error>({
  //   queryKey: ["currentUser"],
  //   queryFn: async (): Promise<User> => {
  //     const res = await fetch(
  //       //TODO: update url
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/owner/me`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //
  //     if (!res.ok) throw new Error("Failed to fetch current user");
  //
  //     const json = await res.json();
  //     return {
  //       id: json?.data?.id,
  //       firstName: json?.data?.firstName,
  //       lastName: json?.data?.lastName,
  //       email: json?.data?.email,
  //       photo: json?.data?.photo,
  //       status: json?.data?.status,
  //       createdAt: json?.data?.createdAt,
  //       updatedAt: json?.data?.updatedAt,
  //     };
  //   },
  //   enabled: !!(isAuthenticated && accessToken && !user),
  //   retry: false,
  // } as UseQueryOptions<User, Error>);

  // Sync Zustand user state with query result
  useEffect(() => {
    if (!accessToken) {
      clearUser();
      clearTokens();
      return;
    }

    if (!authLoading && accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      router.replace(target);
    }

    // if (currentUserQuery.data) {
    //   setUser(currentUserQuery.data);
    //   setLoading(false);
    //
    //   // setTokens({ accessToken: accessToken, refreshToken: getRefreshToken() });
    // }
    // if (currentUserQuery.error) {
    //   clearTokens();
    //   clearUser();
    // }
  }, [
    // currentUserQuery.data,
    // currentUserQuery.error,
    // setUser,
    // setLoading,
    clearTokens,
    clearUser,
  ]);

  /**
   * Login Mutation
   * -------------------------
   * Authenticates user and stores tokens + user in Zustand.
   */
  const loginMutation = useMutation<AuthResponse, Error, LoginFormType>({
    mutationFn: async (data, role) => {
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

      const json = await res.json();
      return {
        token: json.data.accessToken,
        refreshToken: json.data.refreshToken,
        user: {
          id: json.data.id,
          firstName: json.data.firstName,
          lastName: json.data.lastName,
          email: json.data.email,
          photo: json.data.photo,
          status: json.data.status,
          createdAt: json.data.createdAt,
          updatedAt: json.data.updatedAt,
        },
      };
    },
    onSuccess: (data) => {
      showToast("success", "Login Success");
      setTokens({ accessToken: data.token, refreshToken: data.refreshToken });
      setUser(data.user);
      queryClient.setQueryData(["currentUser"], data.user);
      router.replace(target);
    },
    onError: (err: Error) => showToast("error", err.message),
  });

  /**
   * Register Mutation
   * -------------------------
   * Registers a new user and logs them in automatically.
   */
  const registerMutation = useMutation<
    AuthResponse,
    Error,
    RegisterFormPayload
  >({
    mutationFn: async (data) => {
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
      return {
        token: json.data.accessToken,
        refreshToken: json.data.refreshToken,
        user: {
          id: json.data.id,
          firstName: json.data.firstName,
          lastName: json.data.lastName,
          email: json.data.email,
          photo: json.data.photo,
          status: json.data.status,
          createdAt: json.data.createdAt,
          updatedAt: json.data.updatedAt,
        },
      };
    },
    onSuccess: (data) => {
      showToast("success", "Registration Successful");
      setTokens({ accessToken: data.token, refreshToken: data.refreshToken });
      setUser(data.user);
      queryClient.setQueryData(["currentUser"], data.user);
      router.push("/");
    },
    onError: (err: Error) => showToast("error", err.message),
  });

  /**
   * Logout Mutation
   * -------------------------
   * Logs the user out, clears tokens and user state.
   */
  const signOutMutation = useMutation({
    mutationFn: async () => {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/owner/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
          },
        },
      );
    },
    onSuccess: () => {
      clearTokens();
      clearUser();
      queryClient.clear();
      showToast("success", "Logged out successfully");
      router.push("admin/login");
    },
    onError: () => {
      clearTokens();
      clearUser();
      queryClient.clear();
      router.push("/login");
    },
  });

  // Expose states and actions to components
  return {
    user,
    isAuthenticated,
    isLoading: authLoading,
    // isLoading: authLoading || currentUserQuery.isLoading,

    login: (credentials: LoginFormType) => loginMutation.mutate(credentials),
    register: (data: RegisterFormPayload) => registerMutation.mutate(data),
    signout: () => signOutMutation.mutate(),

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isSigningOut: signOutMutation.isPending,
  };
};
