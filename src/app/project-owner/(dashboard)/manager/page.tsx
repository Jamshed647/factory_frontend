"use client";
import ManagerTable from "@/components/pageComponents/managerComponents/managerTable";
import React from "react";

const FactoriesOverview = () => {
  return (
    <div className="mt-10">
      <ManagerTable switchUser={true} />
    </div>
  );
};

export default FactoriesOverview;
