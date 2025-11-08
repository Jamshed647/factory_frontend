"use client";
import { SalesmanDashboard } from "@/components/pageComponents/dashboards/salesman-dashboard";
import { useAuth } from "@/hooks/hooks";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      {/* Overview */}
      <SalesmanDashboard />
    </div>
  );
}
