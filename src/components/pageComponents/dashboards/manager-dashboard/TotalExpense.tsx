/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { MetricCard } from "@/components/ui/metric-card";
import dateFormat from "@/utils/formatter/DateFormatter";
import { ArrowUpDown, Banknote, Filter, Wallet } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const TotalExpenseOverview = ({
  factoryId,
  factoryLoading,
}: {
  factoryId: string;
  factoryLoading: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("TODAY");
  const { t } = useLanguage();

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/expense/factory/${factoryId}`,
    queryKey: "getExpenseDataByFactory",
    filterData: {
      rangeType: type,
    },
  });

  const info = data?.data;

  return (
    <DialogWrapper
      title={`Expense History`}
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <MetricCard
            type={type}
            setType={setType}
            options={["ALL", "TODAY", "WEEKLY", "MONTHLY"]}
            isLoading={isLoading || factoryLoading}
            title={t.totalExpense}
            value={info?.totalHistoryAmount}
            description={`${type === "TODAY" ? t.today : type}'s ${t.todaysTotalProfitLoss}`}
            icon={<ArrowUpDown className="w-4 h-4 text-muted-foreground" />}
          />
        </div>
      }
      style=" max-w-[90vw] xl:w-[50vw] max-h-[90vh]"
    >
      <div className="space-y-2">
        {info?.history?.length === 0 ? (
          <div className="py-12 text-center">
            <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground/50" />
            <p className="font-medium text-muted-foreground">
              No records found
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {info?.history?.length === 0 ? (
              <div className="py-12 text-center">
                <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground/50" />
                <p className="font-medium text-muted-foreground">
                  No expense records found
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto space-y-2 max-h-96">
                {info?.history?.map((item: any) => {
                  return (
                    <div
                      key={item.id} // Use the unique ID from data
                      className="flex justify-between items-start p-4 rounded-lg border transition-colors border-border/50 hover:bg-muted/50"
                    >
                      {/* Left - Details */}
                      <div className="flex flex-col flex-1 space-y-2 min-w-0">
                        {/* Title and Category */}
                        <div className="flex gap-2 items-center">
                          <p className="font-semibold truncate">{item.title}</p>
                          <span className="py-1 px-2 text-xs text-blue-700 bg-blue-100 rounded-full">
                            {item.category}
                          </span>
                        </div>

                        {/* Payment Method */}
                        <div className="flex gap-2 items-center">
                          {item.transactionType === "CASH" ? (
                            <Wallet className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Banknote className="w-4 h-4 text-muted-foreground" />
                          )}
                          <span className="text-sm text-muted-foreground">
                            {item.transactionType}
                            {item.transactionType === "ONLINE" && item.bank && (
                              <span className="ml-1">
                                • {item.bank.name} (
                                {item.bank.accountNo.slice(-4)})
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Note if available */}
                        {item.note && (
                          <p className="text-sm text-muted-foreground">
                            {t.note}: {item.note}
                          </p>
                        )}

                        {/* Date and Time */}
                        <p className="text-xs text-muted-foreground">
                          {dateFormat.fullDateTime(item.createdAt)}
                        </p>
                      </div>

                      {/* Right - Amount */}
                      <div className="ml-4 text-right">
                        <p className="text-lg font-bold text-red-600">
                          -৳{item.amount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Summary */}
            {/* {info?.history && info.history.length > 0 && ( */}
            {/*   <div className="pt-4 mt-4 border-t"> */}
            {/*     <div className="flex justify-between items-center"> */}
            {/*       <p className="font-medium">Total Expenses</p> */}
            {/*       <p className="text-xl font-bold text-red-600"> */}
            {/*         -৳{info?.totalHistoryAmount || 0} */}
            {/*       </p> */}
            {/*     </div> */}
            {/*   </div> */}
            {/* )} */}
          </div>
        )}
      </div>
    </DialogWrapper>
  );
};

export default TotalExpenseOverview;
