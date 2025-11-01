"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";

const SalesmanTable = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `api/v1/auth/salesman/factory/${id}`,
    queryKey: "getSalesmanDataByFactory",
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
            {/* <CreateManagerModal /> */}
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
              // {
              //   key: "action",
              //   header: "Action",
              //   render: (user) => (
              //     <ResponsiveButtonGroup>
              //       <UpdateCompanyModal data={user} />
              //       <DeleteCompanyModal data={user} />
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

export default SalesmanTable;
