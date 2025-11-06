"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { useAuth } from "@/hooks/hooks";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import EmployeeTable from "@/components/pageComponents/employeeComponents/employeeInfo/employeeTable";

export default function DashboardPage() {
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [searchText, setSearchText] = React.useState("");
  const { user } = useAuth();
  const factoryId = getFactoryId();

  const id =
    user?.role === "PROJECT_OWNER" || user?.role === "COMPANY_OWNER"
      ? factoryId
      : user?.factory?.id;

  // const { data, isLoading } = useFetchData({
  //   method: "GET",
  //   path: `auth/employee/factory/${id}`,
  //   queryKey: "getEmployeeData",
  //   filterData: {},
  // });

  return (
    <div>
      {/* User Table */}
      <div className="mt-10">
        <EmployeeTable factoryId={id as string} />
      </div>
    </div>
  );
}
