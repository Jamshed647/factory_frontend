"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import FactoryTable from "./_assets/components/FactoryTable";
import { useAuth } from "@/hooks/hooks";

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { user } = useAuth();

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `auth/factory/company/${user?.id}`,
    queryKey: "getFactoryData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
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
