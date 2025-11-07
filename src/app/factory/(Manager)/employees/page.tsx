"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import EmployeeTable from "@/components/pageComponents/employeeComponents/employeeTable";

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
      <div className="mt-10">
        <EmployeeTable factoryId={id as string} />
      </div>
    </div>
  );
}
