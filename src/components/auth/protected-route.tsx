"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/hooks";
import { usePermission } from "@/hooks/use-permission";
import DataLoader from "../common/GlobalLoader/dataLoader";

interface ProtectedProps {
  children: React.ReactNode;
  roles: "ADMIN" | "MANAGER" | "USER";
}

export function Protected({ children, roles }: ProtectedProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { hasRole } = usePermission();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`login`);
    }
  }, [isAuthenticated, isLoading, roles, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <DataLoader />
      </div>
    );
  }

  // If user not authenticated
  // if (!isAuthenticated || !user) {
  // TODO: remove this
  if (!isAuthenticated) {
    return null;
  }

  // Role-based access control
  if (roles && !roles !== hasRole(roles)) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <h2 className="mb-2 text-xl font-semibold">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // All good — render protected content
  return <>{children}</>;
}
