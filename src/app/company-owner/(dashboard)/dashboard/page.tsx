"use client";
import React from "react";
import { CompanyDashboard } from "@/components/pageComponents/dashboards/company-dashboard";

export default function DashboardPage() {
  // const { data, isLoading } = useFetchData({
  //   method: "GET",
  //   path: "auth/factory",
  //   queryKey: "getFactoryData",
  //   filterData: {},
  // });

  return (
    <div>
      {/* Overview */}
      <CompanyDashboard />
    </div>
  );
}
