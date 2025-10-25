"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import ManagerTable from "./_assets/components/ManagerTable";

const FactoriesOverview = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "api/v1/auth/manager/all",
    queryKey: "getManagerData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="mt-10">
      <ManagerTable
        searchText={searchText}
        setSearchText={setSearchText}
        data={data}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default FactoriesOverview;
