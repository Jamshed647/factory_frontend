"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import CreateCustomerModal from "./create/createCustomerModal";
import Link from "next/link";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import UpdateCustomerModal from "./update/updateCustomerModal";

interface TableProps {
  factoryId?: string;
  switchUser?: boolean;
}

const CustomerTable = ({ factoryId, switchUser = false }: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const path = factoryId ? `factory/customer/${factoryId}` : `factory/customer`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getCustomerData",
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
          <h2 className="text-2xl font-bold">Customer List</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateCustomerModal factoryId={factoryId} />
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
                  <Link href={`/factory/bank/${item.id}`}>{item.name}</Link>
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
              {
                key: "action",
                header: "Action",
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateCustomerModal data={user} />
                    {/* <DeleteEmployeeModal data={user} /> */}
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

export default CustomerTable;
