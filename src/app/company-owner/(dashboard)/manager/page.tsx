"use client";
import ManagerTable from "@/components/pageComponents/managerComponents/managerTable";
import { useAuth } from "@/hooks/hooks";
import React from "react";

const FactoriesOverview = () => {
  const { user } = useAuth();
  // const { data, isLoading } = useFetchData({
  //   method: "GET",
  //   path: "auth/manager/all",
  //   queryKey: "getManagerData",
  //   filterData: {
  //     search: searchText,
  //     page: currentPage,
  //   },
  // });

  return (
    <div className="mt-10">
      <ManagerTable companyId={user?.id} switchUser={true} />
    </div>
  );
};

export default FactoriesOverview;
