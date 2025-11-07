"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import ManagerTable from "./_assets/components/ManagerTable";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";

const FactoriesOverview = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { user } = useAuth();
  const factoryId = getFactoryId();

  const id =
    user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
      ? factoryId
      : user?.factory?.id;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `auth/manager/factory/${id}`,
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
