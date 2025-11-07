"use client";

import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FactoryInfo from "./factoryInfo";
import ManagerTable from "../managerComponents/managerTable";
import EmployeeTable from "../employeeComponents/employeeTable";
import SalesmanTable from "../salesmanComponents/salesmanTable";

interface CompanyPageProps {
  id: string;
}

const FactoryAccessOverview = ({ id }: CompanyPageProps) => {
  const { data, isLoading } = useFetchData({
    path: `auth/factory/${id}`,
    queryKey: "fetchSingleCompany",
  });

  const factory = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-100">
        Factory Dashboard —{" "}
        <span className="text-primary">{factory?.name}</span>
      </h1>

      <Tabs defaultValue="info" className="mt-4">
        {/* ========== Tabs ========== */}
        <TabsList className="flex flex-wrap gap-2 justify-start pb-2 border-b">
          <TabsTrigger value="info">Overview</TabsTrigger>
          <TabsTrigger value="manager">Managers</TabsTrigger>
          <TabsTrigger value="employee">Employees</TabsTrigger>
          <TabsTrigger value="salesman">Salesmen</TabsTrigger>
          <TabsTrigger value="product"> Product</TabsTrigger>
        </TabsList>

        {/* ========== Info Tab ========== */}
        <TabsContent value="info">
          <FactoryInfo factory={factory} isLoading={isLoading} />
        </TabsContent>

        {/* ========== Manager Tab ========== */}
        <TabsContent value="manager" className="mt-6">
          <ManagerTable id={id} />
        </TabsContent>

        {/* ========== Employee Tab ========== */}
        <TabsContent value="employee" className="mt-6">
          <EmployeeTable factoryId={id} />
        </TabsContent>

        {/* ========== Salesman Tab ========== */}
        <TabsContent value="salesman" className="mt-6">
          <SalesmanTable factoryId={id} />
        </TabsContent>

        {/* ========== Product Tab ========== */}
        {/* <TabsContent value="product"> */}
        {/*   <ProductTable id={id} /> */}
        {/* </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default FactoryAccessOverview;
