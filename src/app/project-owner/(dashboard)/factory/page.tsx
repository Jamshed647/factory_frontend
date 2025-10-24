"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import FactoryTable from "./_assets/components/FactoryTable";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "api/v1/auth/factory",
    queryKey: "getFactoryData",
    filterData: {},
  });

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <FactoryTable
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
