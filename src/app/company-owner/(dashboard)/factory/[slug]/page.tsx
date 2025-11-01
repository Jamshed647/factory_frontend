/* eslint-disable @typescript-eslint/no-explicit-any */
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
  console.log(slug);

  const { data, isLoading } = useFetchData({
    path: `auth/factory/${slug}`,
    queryKey: "fetchSingleCompany",
  });

  const company = data?.data;

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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-100">
        Factory Dashboard —{" "}
        <span className="text-primary">{company?.name}</span>
      </h1>

      <Tabs defaultValue="info" className="mt-4">
        {/* ========== Tabs ========== */}
        <TabsList className="flex flex-wrap gap-2 justify-start pb-2 border-b">
          <TabsTrigger value="info">Overview</TabsTrigger>
          <TabsTrigger value="manager">Managers</TabsTrigger>
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
                  Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {company?.name ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Address:</span>{" "}
                  {company?.address ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Contact:</span>{" "}
                  {company?.contactInfo ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      company?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {company?.status ?? "Unknown"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-700">Created:</span>{" "}
                  {company?.createdAt
                    ? new Date(company.createdAt).toLocaleString()
                    : "—"}
                </p>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Company Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-700">Name:</span>{" "}
                  {company?.companyOwner?.name ?? "—"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {company?.companyOwner?.phone ?? "—"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Users Section */}
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-bold">All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {company?.users?.length ? (
                  company?.users?.map((user: any) => (
                    <div
                      key={user?.id}
                      className="flex justify-between items-center pb-2 border-b"
                    >
                      <div>
                        <p className="font-medium">
                          {user?.name ?? "Unnamed User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user?.phone ?? "—"}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          user?.role === "SALESMAN"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {user?.role ?? "—"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No users available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== Manager Tab ========== */}
        <TabsContent value="manager" className="mt-6">
          <ManagerTable id={slug} />
        </TabsContent>

        {/* ========== Employee Tab ========== */}
        <TabsContent value="employee" className="mt-6">
          <EmployeeTable id={slug} />
        </TabsContent>

        {/* ========== Salesman Tab ========== */}
        <TabsContent value="salesman" className="mt-6">
          <SalesmanTable id={slug} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Company_Page;
