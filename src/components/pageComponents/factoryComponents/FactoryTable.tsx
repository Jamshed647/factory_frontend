"use client";

import React from "react";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import { CustomField } from "@/components/common/fields/cusField";
import Link from "next/link";
import CreateFactoryModal from "./_assets/components/create/createFactoryModal";
import UpdateCompanyModal from "./_assets/components/update/updateCompanyModal";
import DeleteCompanyModal from "./_assets/components/delete/deleteCompanyModal";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";

interface TableProps {
  companyId?: string;
}

const FactoryTable = ({ companyId }: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const path = companyId ? `auth/factory/company/${companyId}` : `auth/factory`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getFactoryData",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="rounded-md border shadow-lg">
      {/* Table Header */}
      <div className="flex justify-between items-center p-3">
        <h2 className="text-2xl font-bold">Factory List</h2>
        <div className="flex gap-x-2 items-center">
          <CustomField.CommonSearch
            width="w-full"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CreateFactoryModal />
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
              render: (user) => (
                <Link href={`factory/${user.id}`}>{user.name}</Link>
              ),
            },
            { key: "address", header: "Address" },
            { key: "phone", header: "Contact Info" },
            { key: "status", header: "Status" },
            {
              key: "companyOwner",
              header: "Company Owner",
              render: (user) => user.companyOwner.name,
            },
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

export default FactoryTable;
