/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon, TrashIcon } from "lucide-react";

interface TableProps {
  data: any;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const UserTable = ({
  data,
  isLoading,
  currentPage,
  setCurrentPage,
}: TableProps) => {
  const handleAction = (info: any, action: "update" | "disable" | "delete") => {
    console.log("Action:", info, action);
  };

  return (
    <>
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
            { key: "action", header: "Action", render: (user) => <ResponsiveButtonGroup>

              <ActionButton
              icon={<Edit2Icon className="h-5 w-5" />}
              handleOpen={() => handleAction(user, "update")}
              />

              <ActionButton
                icon={<TrashIcon className="h-5 w-5" />}
                handleOpen={() => handleAction(user, "delete")}
              />

            </ResponsiveButtonGroup> },

          ],
        }}
      />
    </>
  );
};

export default UserTable;
