"use client";

import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManagerTable from "./_assets/components/managerInfo/managerTable";
import EmployeeTable from "./_assets/components/employeeInfo/employeeTable";
import SalesmanTable from "./_assets/components/salesmanInfo/salesmanTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "antd";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = React.use(params);

  const { data, isLoading } = useFetchData({
    path: `auth/manager/${slug}`,
    queryKey: "fetchSingleManager",
  });

  const manager = data?.data;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center min-h-screen text-gray-500">
        <Skeleton className="w-48 h-8 rounded" />
        <Skeleton className="w-80 h-5 rounded" />
        <p>Loading company info...</p>
      </div>
    );
  }

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
          {/* <TabsTrigger value="manager">Managers</TabsTrigger> */}
          <TabsTrigger value="employee">Employees</TabsTrigger>
          <TabsTrigger value="salesman">Salesmen</TabsTrigger>
        </TabsList>

        {/* ========== Info Tab ========== */}
        <TabsContent value="info">
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            {/* Company Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Factory Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {manager?.firstName + " " + manager?.lastName}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Address:</span>{" "}
                  {manager?.address ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Contact:</span>{" "}
                  {manager?.phone ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      manager?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {manager?.status ?? "Unknown"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Created:</span>{" "}
                  {manager?.createdAt
                    ? new Date(manager.createdAt).toLocaleString()
                    : "—"}
                </p>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Company Owner & Factory Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {/* Company Owner Info */}
                <div>
                  <h3 className="mb-1 font-semibold text-gray-800">
                    Company Owner
                  </h3>
                  <p>
                    <span className="font-medium text-gray-700">Name:</span>{" "}
                    {manager?.companyOwner?.name ?? "—"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Phone:</span>{" "}
                    {manager?.companyOwner?.phone ?? "—"}
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <h3 className="mb-1 font-semibold text-gray-800">
                    Factory Info
                  </h3>
                  <p>
                    <span className="font-medium text-gray-700">
                      Factory Name:
                    </span>{" "}
                    {manager?.factory?.name ?? "—"}
                  </p>
                  {/* <p> */}
                  {/*   <span className="font-medium text-gray-700"> */}
                  {/*     Factory Code: */}
                  {/*   </span>{" "} */}
                  {/*   {manager?.factory?.code ?? "—"} */}
                  {/* </p> */}
                  {/* <p> */}
                  {/*   <span className="font-medium text-gray-700">Location:</span>{" "} */}
                  {/*   {manager?.factory?.address ?? "—"} */}
                  {/* </p> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ========== Employee Tab ========== */}
        <TabsContent value="employee" className="mt-6">
          <EmployeeTable id={manager?.factory?.id} />
        </TabsContent>

        {/* ========== Salesman Tab ========== */}
        <TabsContent value="salesman" className="mt-6">
          <SalesmanTable id={manager?.factory?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Company_Page;
