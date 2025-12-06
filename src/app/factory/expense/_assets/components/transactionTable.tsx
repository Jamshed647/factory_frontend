/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import dateFormat from "@/utils/formatter/DateFormatter";
import UpdateExpenseDialog from "./UpdateExpense";
import { useAuth } from "@/hooks/hooks";

interface TransactionTableProps {
  transactions: any[];
  isLoading: boolean;
  pagination: any;
  // onPageChange: (page: number) => void;
}

export default function TransactionTable({
  transactions,
  isLoading,
  pagination,
  // onPageChange,
}: TransactionTableProps) {
  const { user } = useAuth();
  const factory = user?.factory;

  // Config for dynamic table
  const tableConfig = {
    columns: [
      {
        key: "title",
        header: "Title",
        className: "py-3 px-4 text-sm",
      },
      {
        key: "category",
        header: "Category",
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-600">{row.category}</span>
        ),
      },
      {
        key: "amount",
        header: "Amount",
        className: "py-3 px-4 text-sm font-medium",
        render: (row: any) => (
          <span className="text-emerald-600">
            ${row.amount.toLocaleString()}
          </span>
        ),
      },
      {
        key: "transactionType",
        header: "Type",
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span
            className={`font-medium ${
              row.transactionType === "ONLINE"
                ? "text-blue-600"
                : "text-amber-600"
            }`}
          >
            {row.transactionType}
          </span>
        ),
      },
      {
        key: "bank",
        header: "Bank",
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-600">{row.bank?.name || "Cash"}</span>
        ),
      },
      {
        key: "createdAt",
        header: "Date",
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-500">
            {dateFormat.fullDateTime(row.createdAt)}
          </span>
        ),
      },
      {
        key: "action",
        header: "Action",
        render: (row: any) => (
          <UpdateExpenseDialog factory={factory} value={row} />
        ),
      },
    ],
  };

  return (
    <div className="space-y-4">
      <DynamicTableWithPagination
        data={transactions}
        isLoading={isLoading}
        //        pagination={pagination}
        //       currentPage={pagination?.page || 1}
        //        setCurrentPage={(page) => onPageChange(page)}
        config={tableConfig}
        isCheckBox={false}
      />
    </div>
  );
}
