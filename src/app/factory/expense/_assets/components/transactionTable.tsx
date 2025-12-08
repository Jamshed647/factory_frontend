/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import dateFormat from "@/utils/formatter/DateFormatter";
import UpdateExpenseDialog from "./UpdateExpense";
import { useAuth } from "@/hooks/hooks";
import { useLanguage } from "@/hooks/useLanguage";

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
  const { t } = useLanguage();

  // Config for dynamic table
  const tableConfig = {
    columns: [
      {
        key: "title",
        header: t.title,
        className: "py-3 px-4 text-sm",
      },
      {
        key: "category",
        header: t.category,
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-600">{row.category}</span>
        ),
      },
      {
        key: "amount",
        header: t.amount,
        className: "py-3 px-4 text-sm font-medium",
        render: (row: any) => (
          <span className="text-emerald-600">
            ${row.amount.toLocaleString()}
          </span>
        ),
      },
      {
        key: "transactionType",
        header: t.type,
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span
            className={`font-medium ${row.transactionType === "ONLINE"
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
        header: t.bank,
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-600">{row.bank?.name || t.cash}</span>
        ),
      },
      {
        key: "createdAt",
        header: t.date,
        className: "py-3 px-4 text-sm",
        render: (row: any) => (
          <span className="text-gray-500">
            {dateFormat.fullDateTime(row.createdAt)}
          </span>
        ),
      },
      {
        key: "action",
        header: t.action,
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
