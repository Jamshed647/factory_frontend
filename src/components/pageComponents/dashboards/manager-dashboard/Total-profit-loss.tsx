/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { MetricCard } from "@/components/ui/metric-card";
import { ArrowUpDown, Filter } from "lucide-react";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

const TodaysProfitLossAmount = ({ factoryId, factoryLoading }: any) => {
  const [type, setType] = React.useState("TODAY");
  const [open, setOpen] = React.useState(false);
  const { t } = useLanguage();
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `dashboard/factory/profit-loss/${factoryId}`,
    queryKey: "getTodaySalesDataByFactory",
    filterData: {
      rangeType: type,
      history: open,
    },
  });
  const info = data?.data;

  return (
    <DialogWrapper
      title={t.totalProfitLoss}
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <MetricCard
            type={type}
            setType={setType}
            isLoading={isLoading || factoryLoading}
            title={t.totalProfitLoss}
            value={info?.totalProfitLoss}
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
          <div className="overflow-y-auto space-y-2 max-h-96">
            {info?.history?.map((item: any) => {
              const isLoss = item.totalProfitLoss < 0;
              return (
                <div
                  key={item.productId + item.saleId}
                  className="flex justify-between items-center p-4 rounded-lg border transition-colors border-border/50 hover:bg-muted/50"
                >
                  {/* Left */}
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                      {/* <p className="font-semibold truncate"> */}
                      {/*   {item.productName} */}
                      {/* </p> */}

                      <p className="text-sm font-semibold">
                        Invoice: {item?.invoiceNo}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${isLoss
                            ? "bg-red-100 text-red-700"
                            : "bg-emerald-100 text-emerald-700"
                          }`}
                      >
                        {isLoss ? "LOSS" : "PROFIT"}
                      </span>
                    </div>

                    {/* <p className="text-sm text-muted-foreground"> */}
                    {/*   Qty: {item.quantity} × ৳{item.sellPrice} */}
                    {/* </p> */}

                    <p className="text-sm text-muted-foreground">
                      Discount Amount: ৳{item?.discountAmount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Revenue: ৳{item?.totalRevenue}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Cost: ৳{item?.totalCost}
                    </p>

                    {/* <p className="text-xs text-muted-foreground"> */}
                    {/*   {dateFormat.fullDateTime(item.date)} */}
                    {/* </p> */}
                  </div>

                  {/* Right */}
                  <div className="ml-4 text-right">
                    <p
                      className={`text-lg font-bold ${isLoss ? "text-red-600" : "text-emerald-600"
                        }`}
                    >
                      {isLoss ? "−" : "+"}৳
                      {((n) => (n % 1 ? n.toFixed(2) : n))(
                        Math.abs(item.totalProfitLoss),
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DialogWrapper>
  );
};

export default TodaysProfitLossAmount;
