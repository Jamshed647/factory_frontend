"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { ManagerDashboard } from "@/components/pageComponents/dashboards/manager-dashboard";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import React from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const switchFactoryId = getFactoryId();

  const factoryId = user?.factoryId ? user?.factoryId : switchFactoryId;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/cash/factory/${factoryId}`,
    queryKey: "getCashDataByFactory",
  });

  return (
    <div>
      {/* Overview */}
      <ManagerDashboard cash={data?.data[0]} />
    </div>
  );
}
