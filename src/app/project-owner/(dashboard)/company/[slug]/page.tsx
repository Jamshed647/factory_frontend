"use client";

import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompaniesFactoryTable from "./_assets/components/CompaniesFactoryTable";

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
}

const Company_Page = ({ params }: CompanyPageProps) => {
  const { slug } = React.use(params);

  const { data: company, isLoading: isLoadingCompany } = useFetchData({
    path: `auth/company/user/${slug}`,
    queryKey: "fetchSingleCompany",
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-wide text-gray-800 dark:text-gray-100">
        Company — <span className="text-primary">{company?.data?.name}</span>
      </h1>

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
        {/* Company Info */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Company Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {company?.data?.name ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {company?.data?.address ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Contact:</span>{" "}
              {company?.data?.phone ?? "—"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Status:</span>{" "}
              <span
                className={`px-2 py-1 text-xs rounded ${
                  company?.data?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {company?.data?.status ?? "Unknown"}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Created:</span>{" "}
              {company?.data?.createdAt
                ? new Date(company?.data.createdAt).toLocaleString()
                : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Section */}
      <CompaniesFactoryTable id={slug} />
    </div>
  );
};

export default Company_Page;
