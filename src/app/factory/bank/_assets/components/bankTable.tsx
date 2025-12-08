"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import CreateBankModal from "./create/createBankModal";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface TableProps {
  factoryId?: string;
  switchUser?: boolean;
}

const BankTable = ({ factoryId, switchUser = false }: TableProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { t } = useLanguage();

  const path = factoryId ? `factory/bank/factory/${factoryId}` : `factory/bank`;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: path,
    queryKey: "getBankDataByFactory",
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
          <h2 className="text-2xl font-bold">{t.bankList}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateBankModal factoryId={factoryId as string} />
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
                header: t.name,
                render: (item) => (
                  <Link href={`/factory/bank/${item.id}`}>{item.name}</Link>
                ),
              },
              { key: "accountNo", header: t.accountNo },
              { key: "branch", header: t.branchAddress },
              { key: "balance", header: t.balance },

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

export default BankTable;
