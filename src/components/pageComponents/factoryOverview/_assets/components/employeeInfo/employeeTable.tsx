"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import UpdateEmployeeModal from "./_assets/components/update/updateEmployeeModal";
import DeleteEmployeeModal from "./_assets/components/delete/deleteEmployeeModal";
import CreateEmployeeModal from "./_assets/components/create/createEmployeeModal";

const EmployeeTable = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `auth/employee/factory/${id}`,
    queryKey: "getManagerDataByFactory",
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
          <h2 className="text-2xl font-bold">Employee List</h2>
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
          pagination={data?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          config={{
            columns: [
              { key: "name", header: "Name" },
              { key: "phone", header: "Contact Info" },
              { key: "status", header: "Status" },
              { key: "role", header: "Role" },
              {
                key: "factoryName",
                header: "Factory Owner Id",
                render: (item) => item?.factory?.name,
              },
              {
                key: "action",
                header: "Action",
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateEmployeeModal data={user} />
                    <DeleteEmployeeModal data={user} />
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
