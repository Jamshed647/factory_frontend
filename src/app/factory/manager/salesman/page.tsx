"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import SalesmanTable from "@/components/pageComponents/salesmanComponents/salesmanTable";

export default function DashboardPage() {
  const { user } = useAuth();
  const factoryId = getFactoryId();

  const id =
    user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
      ? factoryId
      : user?.factory?.id;

  return (
    <div>
      {/* User Table */}
      <SalesmanTable factoryId={id as string} switchUser={true} />
    </div>
  );
}
