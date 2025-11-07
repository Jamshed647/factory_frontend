"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import { getCompanyId } from "@/utils/cookie/companyFactoryCookie";
import SalesmanTable from "@/components/pageComponents/salesmanComponents/salesmanTable";

export default function DashboardPage() {
  const { user } = useAuth();
  const companyId = getCompanyId();

  const id = user?.role === "PROJECT_OWNER" ? companyId : user?.id;

  return (
    <div>
      {/* User Table */}
      <SalesmanTable factoryId={id as string} switchUser={true} />
    </div>
  );
}
