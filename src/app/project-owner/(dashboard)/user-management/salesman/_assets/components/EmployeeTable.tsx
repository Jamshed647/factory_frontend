/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import { CustomField } from "@/components/common/fields/cusField";
import DeleteCompanyModal from "./delete/deleteCompanyModal";
import CreateEmployeeModal from "./create/createEmployeeModal";
import UpdateEmployeeModal from "./update/updateEmployeeModal";

interface TableProps {
  data: any;
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const EmployeeTable = ({
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
        <h2 className="text-2xl font-bold">Salesman List</h2>
        <div className="flex gap-x-2 items-center">
          <CustomField.CommonSearch
            width="w-full"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CreateEmployeeModal />
        </div>
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
            { key: "phone", header: "Contact Info" },
            { key: "status", header: "Status" },
            {
              key: "factory",
              header: "Factory",
              render: (user) => user.factory?.name,
            },
            {
              key: "action",
              header: "Action",
              render: (user) => (
                <ResponsiveButtonGroup>
                  <UpdateEmployeeModal data={user} />
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

export default EmployeeTable;
