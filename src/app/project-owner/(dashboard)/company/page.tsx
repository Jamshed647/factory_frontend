"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import CompanyTable from "./_assets/components/CompanyTable";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "api/v1/auth/company/users",
    queryKey: "getCompanyData",
    filterData: {},
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* User Table */}
      <div className="mt-10">
        <CompanyTable
          searchText={searchText}
          setSearchText={setSearchText}
          data={data}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
