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
import { setFactoryId } from "@/utils/cookie/companyFactoryCookie";
import ActionButton from "@/components/common/button/actionButton";
import { useLanguage } from "@/hooks/useLanguage";

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
            {/* <CreateManagerModal factoryId={factoryId} /> */}
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
                render: (item) =>
                  (item?.firstName ?? "") + " " + (item?.lastName ?? ""),
              },
              { key: "phone", header: t.contactInfo },
              { key: "status", header: t.status },
              // { key: "role", header: t.role },
              // {
              //   key: "factoryName",
              //   header: t.factoryName,
              //   render: (item) => item?.factory?.name,
              // },
              // {
              //   key: "action",
              //   header: t.action,
              //   render: (user) => (
              //     <ResponsiveButtonGroup>
              //       <UpdateManagerModal data={user} />
              //       <DeleteManagerModal data={user} />
              //       {switchUser === true && (
              //         <Link
              //           href={`/factory/manager/dashboard`}
              //           onClick={() => {
              //             setFactoryId(user.factoryId, user?.id, user?.role);
              //           }}
              //         >
              //           <ActionButton
              //             variant="primaryIcon"
              //             buttonContent={t.goToDashboard}
              //           />
              //         </Link>
              //       )}
              //     </ResponsiveButtonGroup>
              //   ),
              // },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ManagerTable;
