"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import CreateSupplierModal from "./create/createSupplierModal";
import Link from "next/link";

interface TableProps {
  factoryId?: string;
  switchUser?: boolean;
}

const SupplierTable = ({ factoryId, switchUser = false }: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const path = factoryId
    ? `factory/supplier/factory/${factoryId}`
    : `factory/supplier`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getSupplierData",
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
          <h2 className="text-2xl font-bold">Supplier List</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateSupplierModal factoryId={factoryId} />
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
                  <Link href={`/factory/supplier/${item.id}`}>{item.name}</Link>
                ),
              },
              { key: "phone", header: "Contact Info" },
              { key: "address", header: "Address" },
              { key: "totalDueAmount", header: "Total Due Amount" },
              {
                key: "factoryName",
                header: "Factory Name",
                render: (item) => item?.factory?.name,
              },
              // {
              //   key: "action",
              //   header: "Action",
              //   render: (user) => (
              //     <ResponsiveButtonGroup>
              //       <UpdateEmployeeModal data={user} />
              //       <DeleteEmployeeModal data={user} />
              //    </ResponsiveButtonGroup>
              //   ),
              // },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default SupplierTable;
