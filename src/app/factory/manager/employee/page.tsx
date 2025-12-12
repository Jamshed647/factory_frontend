"use client";
import React from "react";
import EmployeeTable from "@/components/pageComponents/employeeComponents/employeeTable";
import { useFactory } from "@/utils/factoryInfo";

export default function DashboardPage() {
  const { factory } = useFactory();

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <EmployeeTable factoryId={factory?.id as string} switchUser={true} />
      </div>
    </div>
  );
}
