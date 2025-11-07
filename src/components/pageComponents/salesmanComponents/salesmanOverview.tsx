"use client";

import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SalesmanOverview = ({ id }: { id: string }) => {
  const { data, isLoading } = useFetchData({
    path: `auth/salesman/${id}`,
    queryKey: "fetchSingleManager",
  });

  const manager = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-100">
        Manager —{" "}
        <span className="text-primary">
          {manager?.firstName + " " + manager?.lastName}
        </span>
      </h1>

      <Tabs defaultValue="info" className="mt-4">
        {/* ========== Tabs ========== */}
        <TabsList className="flex flex-wrap gap-2 justify-start pb-2 border-b">
          <TabsTrigger value="info">Overview</TabsTrigger>
          <TabsTrigger value="employee">Employees</TabsTrigger>
          <TabsTrigger value="salesman">Salesmen</TabsTrigger>
          <TabsTrigger value="product"> Product</TabsTrigger>
        </TabsList>

        {/* ========== Info Tab ========== */}
        {/* <TabsContent value="info"> */}
        {/*   <ManagerInfo manager={manager} isLoading={isLoading} /> */}
        {/* </TabsContent> */}

        {/* ========== Employee Tab ========== */}
        {/* <TabsContent value="employee" className="mt-6"> */}
        {/*   <EmployeeTable id={manager?.factory?.id} /> */}
        {/* </TabsContent> */}

        {/* ========== Salesman Tab ========== */}
        {/* <TabsContent value="salesman" className="mt-6"> */}
        {/*   <SalesmanTable id={manager?.factory?.id} /> */}
        {/* </TabsContent> */}

        {/* ========== Product Tab ========== */}
        {/* <TabsContent value="product"> */}
        {/*   <ProductTable id={manager?.factory?.id} /> */}
        {/* </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default SalesmanOverview;
