"use client";
import { EmployeeDashboard } from "@/components/pageComponents/dashboards/employee-dashboard";
import { useAuth } from "@/hooks/hooks";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Overview */}
      <EmployeeDashboard />
    </div>
  );
}
