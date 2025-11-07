"use client";
import React from "react";
import EmployeeTable from "@/components/pageComponents/employeeComponents/employeeTable";

export default function DashboardPage() {
  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <EmployeeTable switchUser={true} />
      </div>
    </div>
  );
}
