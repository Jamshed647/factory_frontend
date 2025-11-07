"use client";
import React from "react";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import ManagerTable from "@/components/pageComponents/managerComponents/managerTable";

const FactoriesOverview = () => {
  const { user } = useAuth();
  const factoryId = getFactoryId();

  const id =
    user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
      ? factoryId
      : user?.factory?.id;

  // const { data, isLoading } = useFetchData({
  //   method: "GET",
  //   path: `auth/manager/factory/${id}`,
  //   queryKey: "getManagerData",
  //   filterData: {
  //     search: searchText,
  //     page: currentPage,
  //   },
  // });

  return (
    <div className="mt-10">
      <ManagerTable id={id as string} />
    </div>
  );
};

export default FactoriesOverview;
