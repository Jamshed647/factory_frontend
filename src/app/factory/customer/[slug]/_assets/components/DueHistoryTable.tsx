/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import dateFormat from "@/utils/formatter/DateFormatter";

export default function DueHistoryTable({ history }: { history: any }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <DynamicTableWithPagination
        data={history}
        isLoading={false}
        config={{
          columns: [
            {
              key: "date",
              header: "Date",
              render: (item) =>
                dateFormat.fullDateTime(item?.createdAt, { showTime: false }),
            },
            { key: "type", header: "Type" },
            { key: "amount", header: "Amount (৳)" },
            { key: "balance", header: "Balance (৳)" },
            // {key: "transactionType", header: "Type"},
            {
              key: "transactionType",
              header: "Transaction Type",
            },

            { key: "note", header: "Note" },
          ],
        }}
      />
    </div>
  );
}
