"use client";
import React from "react";
import ManagerTable from "@/components/pageComponents/managerComponents/managerTable";
import { useFactory } from "@/utils/factoryInfo";

const FactoriesOverview = () => {
  const { factory } = useFactory();

  return (
    <div className="mt-10">
      <ManagerTable factoryId={factory?.id as string} />
    </div>
  );
};

export default FactoriesOverview;
