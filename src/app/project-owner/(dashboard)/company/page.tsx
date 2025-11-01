"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import CompanyTable from "./_assets/components/CompanyTable";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "auth/company/users",
    queryKey: "getCompanyTableData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold">Company Table</h1>

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
