/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import CreateManagerModal from "./_assets/components/create/createManagerModal";
import UpdateManagerModal from "./_assets/components/update/updateManagerModal";
import DeleteManagerModal from "./_assets/components/delete/deleteManagerModal";
import Link from "next/link";
import { setFactory } from "@/utils/cookie/companyFactoryCookie";
import ActionButton from "@/components/common/button/actionButton";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/hooks";

interface TableProps {
  factoryId?: string;
  companyId?: string;
  switchUser?: boolean;
}

const ManagerTable = ({
  factoryId,
  companyId,
  switchUser = false,
}: TableProps) => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { t } = useLanguage();

  const path = factoryId
    ? `auth/manager/factory/${factoryId}`
    : companyId
      ? `auth/manager/companyOwner/${companyId}`
      : `auth/manager/all`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getManagerData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  const columns: any[] = [
    {
      key: "name",
      header: t.name,
      render: (item: any) => `${item?.firstName ?? ""} ${item?.lastName ?? ""}`,
    },
    { key: "phone", header: t.contactInfo },
    { key: "status", header: t.status },
    { key: "role", header: t.role },
    {
      key: "factoryName",
      header: t.factoryName,
      render: (item: any) => item?.factory?.name,
    },
  ];

  // Add action column ONLY when switchUser === true
  if (switchUser === true) {
    columns.push({
      key: "action",
      header: t.action,
      render: (user: any) => (
        <ResponsiveButtonGroup>
          <UpdateManagerModal data={user} />
          <DeleteManagerModal data={user} />
          <Link
            href={`/factory/manager/dashboard`}
            onClick={() => {
              setFactory(
                {
                  id: user.factoryId,
                  name: user.factoryName,
                  address: user.factoryAddress,
                  status: user.factoryStatus,
                },
                user.id,
                user.role,
              );
            }}
          >
            <ActionButton
              variant="primaryIcon"
              buttonContent={t.goToDashboard}
            />
          </Link>
        </ResponsiveButtonGroup>
      ),
    });
  }

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex flex-col gap-5 justify-between items-center p-3 md:flex-row">
          <h2 className="text-2xl font-bold">{t.managerListTitle}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            {user?.role === "COMPANY_OWNER" ||
              (user?.role === "PROJECT_OWNER" && (
                <CreateManagerModal factoryId={factoryId} />
              ))}
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
            columns,
          }}
        />
      </div>
    </div>
  );
};

export default ManagerTable;
