"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import EmployeeTable from "./_assets/components/EmployeeTable";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `auth/employee/all`,
    queryKey: "getEmployeeData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <EmployeeTable
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
