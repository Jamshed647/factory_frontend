/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import { CustomField } from "@/components/common/fields/cusField";
import CreateManagerModal from "./create/createManagerModal";
import UpdateManagerModal from "./update/updateManagerModal";
import DeleteManagerModal from "./delete/deleteManagerModal";
import Link from "next/link";
import { setFactoryId } from "@/utils/cookie/companyFactoryCookie";
import ActionButton from "@/components/common/button/actionButton";

interface TableProps {
  data: any;
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const ManagerTable = ({
  data,
  isLoading,
  searchText,
  setSearchText,
  currentPage,
  setCurrentPage,
}: TableProps) => {
  return (
    <div className="rounded-md border shadow-lg">
      {/* Table Header */}
      <div className="flex justify-between items-center p-3">
        <h2 className="text-2xl font-bold">Manager List</h2>
        <div className="flex gap-x-2 items-center">
          <CustomField.CommonSearch
            width="w-full"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CreateManagerModal factoryId="" />
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
                </ResponsiveButtonGroup>
              ),
            },
          ],
        }}
      />
    </div>
  );
};

export default ManagerTable;
