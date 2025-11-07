"use client";
import ManagerTable from "@/components/pageComponents/managerComponents/managerTable";
import { useAuth } from "@/hooks/hooks";
import { getCompanyId } from "@/utils/cookie/companyFactoryCookie";
import React from "react";

const FactoriesOverview = () => {
  const { user } = useAuth();
  const companyId = getCompanyId();

  const id = user?.role === "PROJECT_OWNER" ? companyId : user?.id;

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
      <ManagerTable companyId={id as string} switchUser={true} />
    </div>
  );
};

export default FactoriesOverview;
