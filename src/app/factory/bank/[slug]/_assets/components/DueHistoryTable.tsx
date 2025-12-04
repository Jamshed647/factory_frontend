"use client";

import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import dateFormat from "@/utils/formatter/DateFormatter";

export default function TransactionHistoryTable({
  bankId,
}: {
  bankId: string;
}) {
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/history/${bankId}`,
    queryKey: "getSingleBankHistoryData",
  });
  const history = data?.data?.data;

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
