import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { Card } from "antd";
import { ClipboardClock, Filter, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";
import { TransactionRow } from "./transactionRow";
import { Transaction } from "./bank-history-viewer";
import DataLoader from "@/components/common/GlobalLoader/dataLoader";

const BankHistoryDialog = ({
  bankId,
  type,
  rangeType,
}: {
  bankId: string;
  type: string;
  rangeType: string;
}) => {
  const [open, setOpen] = useState(false);
  const title = type === "cashIn" ? "Cash In" : "Cash Out";

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/dashboard/${bankId}`,
    queryKey: "getCashDataByFactoryDashboard",
    filterData: {
      rangeType: rangeType,
      history: open,
    },
  });

  const sortedTransactions =
    type === "cashIn"
      ? data?.data?.allHistory?.cashIn
      : data?.data?.allHistory?.cashOut;

  return (
    <DialogWrapper
      title={`${type} Cash History`}
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <Card className="relative w-full border-2 border-dashed transition-all duration-200 cursor-pointer hover:shadow-md border-slate-200 dark:border-slate-700 dark:hover:border-slate-600 hover:border-slate-300">
          <div className="p-6 text-center">
            <ClipboardClock
              className={`mx-auto mb-3 w-8 h-8 ${type === "cashIn" ? "text-emerald-600" : "text-red-600"}`}
            />
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {title} Transaction History
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              View all {title} transactions
            </p>
          </div>
          <div className="absolute top-5 right-5 text-right">
            <div className="flex gap-2 items-center">
              {type === "cashIn" ? (
                <TrendingUp className="mx-auto mb-1 w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="mx-auto mb-1 w-4 h-4 text-red-600" />
              )}

              <p className="text-sm font-semibold text-slate-500">
                {type === "cashIn" ? data?.data?.cashIn : data?.data?.cashOut}
              </p>
            </div>
          </div>
        </Card>
      }
      style="w-[70vw] xl:w-[50vw]  max-h-[90vh]"
    >
      <div>
        {isLoading ? (
          <div className="flex justify-center h-12">
            <DataLoader />
          </div>
        ) : sortedTransactions?.length === 0 ? (
          <div className="py-12 text-center">
            <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">
              No transactions found
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto space-y-2 max-h-96">
            {sortedTransactions?.map((transaction: Transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </DialogWrapper>
  );
};
export default BankHistoryDialog;
