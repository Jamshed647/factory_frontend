"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import UpdateEmployeeModal from "./_assets/components/update/updateEmployeeModal";
import DeleteEmployeeModal from "./_assets/components/delete/deleteEmployeeModal";
import CreateEmployeeModal from "./_assets/components/create/createEmployeeModal";
import Link from "next/link";
import { setFactoryId } from "@/utils/cookie/companyFactoryCookie";
import ActionButton from "@/components/common/button/actionButton";
import { useLanguage } from "@/hooks/useLanguage";

interface TableProps {
  factoryId?: string;
  companyId?: string;
  switchUser?: boolean;
}

const EmployeeTable = ({
  factoryId,
  companyId,
  switchUser = false,
}: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { t } = useLanguage();

  const path = factoryId
    ? `auth/employee/factory/${factoryId}`
    : companyId
      ? `auth/employee/companyOwner/${companyId}`
      : `auth/employee/all`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getEmployeeData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold">{t.employeeList}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateEmployeeModal factoryId={factoryId} />
          </div>
        </div>

        {/* Table Body */}
        <DynamicTableWithPagination
          data={data?.data}
          isLoading={isLoading}
          pagination={data?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          config={{
            columns: [
              {
                key: "name",
                header: t.name,
                render: (item) => (
                  <span>
                    {item?.firstName} {item?.lastName}
                  </span>
                ),
              },
              { key: "phone", header: t.contactInfo },
              // { key: "status", header: t.status },
              { key: "role", header: t.role },
              {
                key: "factoryName",
                header: t.factoryName,
                render: (item) => item?.factory?.name,
              },
              {
                key: "action",
                header: t.action,
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateEmployeeModal data={user} />
                    <DeleteEmployeeModal data={user} />
                    {switchUser === true && (
                      <Link
                        href={`/factory/employee/dashboard`}
                        onClick={() => {
                          setFactoryId(user.factoryId, user?.id, user?.role);
                        }}
                      >
                        <ActionButton
                          variant="primaryIcon"
                          buttonContent={t.goToDashboard}
                        />
                      </Link>
                    )}
                  </ResponsiveButtonGroup>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeTable;
