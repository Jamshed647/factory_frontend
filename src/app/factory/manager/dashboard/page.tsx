"use client";
import { ManagerDashboard } from "@/components/pageComponents/dashboards/manager-dashboard";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const switchFactoryId = getFactoryId();

  // const switchFactoryId = findFactoryId();

  const factoryId = user?.factoryId ? user?.factoryId : switchFactoryId;

  return (
    <div>
      {/* Overview */}
      <ManagerDashboard factoryId={factoryId as string} />
    </div>
  );
}
