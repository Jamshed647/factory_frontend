"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import FactoryTable from "@/components/pageComponents/factoryComponents/FactoryTable";
import { getCompanyId } from "@/utils/cookie/companyFactoryCookie";

export default function DashboardPage() {
  const { user } = useAuth();
  const companyId = getCompanyId();

  const id = user?.role === "PROJECT_OWNER" ? companyId : user?.id;

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <FactoryTable companyId={id as string} />
      </div>
    </div>
  );
}
