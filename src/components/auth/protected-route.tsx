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

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loader while loading or user not fetched
  if (isLoading || (isAuthenticated && !user)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DataLoader />
      </div>
    );
  }

  // Check permission only when user exists
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
