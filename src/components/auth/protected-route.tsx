"use client";

import { useAuth, usePermission } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: ("ADMIN" | "MANAGER" | "USER")[];
}) {
  const { isAuth, user } = useAuth();
  const { hasRole } = usePermission();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) router.push("/login");
  }, [isAuth, router]);

  if (!isAuth || !user) return <div>Loading...</div>;

  if (roles && !roles.some(hasRole)) {
    return <div>Access Denied</div>;
  }

  return <>{children}</>;
}
