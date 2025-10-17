/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { CustomField } from "@/components/common/fields/cusField";
import CreateUserModal from "./create/createUserModal";

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
  const handleAction = (info: any, action: "update" | "disable" | "delete") => {
    console.log("Action:", info, action);
  };

  return (
    <div className="rounded-md border shadow-lg">
      {/* Table Header */}
      <div className="flex justify-between items-center p-3">
        <CustomField.CommonSearch
          width="w-full"
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <CreateUserModal />
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
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "factories_count", header: "Factories Count" },
            {
              key: "action",
              header: "Action",
              render: (user) => (
                <ResponsiveButtonGroup>
                  <ActionButton
                    icon={<Edit2Icon className="w-5 h-5" />}
                    handleOpen={() => handleAction(user, "update")}
                  />

                  <ActionButton
                    icon={<TrashIcon className="w-5 h-5" />}
                    handleOpen={() => handleAction(user, "delete")}
                  />
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
