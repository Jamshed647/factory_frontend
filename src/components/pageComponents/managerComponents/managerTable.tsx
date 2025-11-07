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

interface TableProps {
  id?: string;
  switchUser?: boolean;
}

const ManagerTable = ({ id, switchUser = false }: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: id ? `auth/manager/factory/${id}` : `auth/manager/all`,
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
          <h2 className="text-2xl font-bold">Manager List</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateManagerModal factoryId={id} />
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
                header: "Name",
                render: (item) => (
                  <Link href={`manager/${item?.id}`}>
                    {item?.firstName} {item?.lastName}
                  </Link>
                ),
              },
              { key: "phone", header: "Contact Info" },
              { key: "status", header: "Status" },
              { key: "role", header: "Role" },
              {
                key: "factoryName",
                header: "Factory Owner",
                render: (item) => item?.factory?.name,
              },
              {
                key: "action",
                header: "Action",
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateManagerModal data={user} />
                    <DeleteManagerModal data={user} />
                    {switchUser === true && (
                      <Link
                        href={`/factory/dashboard`}
                        onClick={() => {
                          setFactoryId(user.factoryId, user?.id);
                        }}
                      >
                        <ActionButton
                          variant="primaryIcon"
                          buttonContent="Go to Dashboard"
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

export default ManagerTable;
