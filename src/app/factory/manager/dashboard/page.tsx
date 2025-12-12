"use client";
import { ManagerDashboard } from "@/components/pageComponents/dashboards/manager-dashboard";
import { useFactory } from "@/utils/factoryInfo";
import React from "react";

export default function DashboardPage() {
  const { factory, isLoading } = useFactory();
  console.log("factory", factory);

  return (
    <div>
      {/* Overview */}
      <ManagerDashboard factory={factory} isLoading={isLoading} />
    </div>
  );
}
