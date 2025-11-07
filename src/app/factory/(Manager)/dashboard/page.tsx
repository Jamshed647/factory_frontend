"use client";
import { ManagerDashboard } from "@/components/pageComponents/dashboards/manager-dashboard";
import { useAuth } from "@/hooks/hooks";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Overview */}
      <ManagerDashboard />
    </div>
  );
}
