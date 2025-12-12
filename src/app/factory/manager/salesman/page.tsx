"use client";
import React from "react";
import SalesmanTable from "@/components/pageComponents/salesmanComponents/salesmanTable";
import { useFactory } from "@/utils/factoryInfo";

export default function DashboardPage() {
  const { factory } = useFactory();

  return (
    <div>
      {/* User Table */}
      <SalesmanTable factoryId={factory?.id as string} switchUser={true} />
    </div>
  );
}
