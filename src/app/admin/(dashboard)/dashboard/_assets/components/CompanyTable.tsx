/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import { CustomField } from "@/components/common/fields/cusField";
import CreateCompanyModal from "./create/createCompanyModal";
import UpdateCompanyModal from "./update/updateCompanyModal";
import DeleteCompanyModal from "./delete/deleteCompanyModal";

interface TableProps {
  data: any;
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const UserTable = ({
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
        <CustomField.CommonSearch
          width="w-full"
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <CreateCompanyModal />
      </div>

      {/* Table Body */}
      <DynamicTableWithPagination
        data={data?.data}
        isLoading={isLoading}
        //  pagination={data?.pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        config={{
          columns: [
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "factories_count", header: "Factories Count" },
            {
              key: "action",
              header: "Action",
              render: (user) => (
                <ResponsiveButtonGroup>
                  <UpdateCompanyModal data={user} />
                  <DeleteCompanyModal data={user} />
                </ResponsiveButtonGroup>
              ),
            },
          ],
        }}
      />
    </div>
  );
};

export default UserTable;
