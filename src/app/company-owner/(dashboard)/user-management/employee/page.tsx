"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import { getCompanyId } from "@/utils/cookie/companyFactoryCookie";
import EmployeeTable from "@/components/pageComponents/employeeComponents/employeeTable";

export default function DashboardPage() {
  const { user } = useAuth();
  const companyId = getCompanyId();

  const id = user?.role === "PROJECT_OWNER" ? companyId : user?.id;

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <EmployeeTable factoryId={id as string} switchUser={true} />
      </div>
    </div>
  );
}
