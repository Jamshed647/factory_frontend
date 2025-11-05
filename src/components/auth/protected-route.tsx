"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/hooks";
import { usePermission } from "@/hooks/use-permission";
import DataLoader from "../common/GlobalLoader/dataLoader";

interface ProtectedProps {
  children: React.ReactNode;
  roles:
    | "PROJECT_OWNER"
    | "COMPANY_OWNER"
    | "MANAGER"
    | "EMPLOYEE"
    | "SALESMAN";
}

export function Protected({ children, roles }: ProtectedProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated, user } = useAuth();
  const { hasRole } = usePermission();

  // Wait until auth is fully initialized before redirecting
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Still loading auth state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DataLoader />
      </div>
    );
  }

  // Auth finished but user not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // User exists but has no permission
  if (user && !hasRole(roles)) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <h2 className="mb-2 text-xl font-semibold">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <>{children}</>;
}
