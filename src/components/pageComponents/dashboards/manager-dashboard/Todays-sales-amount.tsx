/* eslint-disable @typescript-eslint/no-explicit-any */
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { MetricCard } from "@/components/ui/metric-card";
import dateFormat from "@/utils/formatter/DateFormatter";
import {
  ArrowDownLeft,
  ArrowUpRight,
  BaggageClaim,
  Filter,
} from "lucide-react";
import React from "react";

const TodaysSalesAmount = ({ factoryId }: { factoryId: string }) => {
  const [type, setType] = React.useState("TODAY");
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `dashboard/factory/sell/${factoryId}`,
    queryKey: "getTodaySalesDataByFactory",
    filterData: {
      rangeType: type,
      history: open,
    },
  });
  const info = data?.data;

  return (
    <DialogWrapper
      title={`Sales Amount`}
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <MetricCard
            type={type}
            setType={setType}
            isLoading={isLoading}
            title=" Sales Amount"
            value={info?.totalSale}
            description={`${type}'s Total sales amount`}
            icon={<BaggageClaim className="w-4 h-4 text-muted-foreground" />}
          />
        </div>
      }
      style="w-[90vw] xl:w-[50vw] max-h-[90vh]"
    >
      <>
        <div className="space-y-2">
          {data?.data?.history?.length === 0 ? (
            <div className="py-12 text-center">
              <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground/50" />
              <p className="font-medium text-muted-foreground">
                No transactions found
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto space-y-2">
              {data?.data?.history?.map((invoice: any) => {
                const isPay = invoice.paidAmount < invoice.totalSaleAmount;

                return (
                  <div
                    key={invoice.id}
                    className="flex justify-between items-center p-4 rounded-lg border transition-colors border-border/50 hover:bg-muted/50"
                  >
                    {/* Left */}
                    <div className="flex flex-1 gap-4 min-w-0">
                      <div>
                        {isPay ? (
                          <ArrowDownLeft className="w-5 h-5 text-red-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex gap-2 items-center mb-1">
                          <p className="font-semibold truncate">
                            {invoice.invoiceNo}
                          </p>

                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              isPay
                                ? "bg-red-100 text-red-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {isPay ? "DUE" : "PAID"}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Seller: {invoice.sellerName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {dateFormat.fullDateTime(invoice.date)}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                          <span className="font-semibold">Note:</span>{" "}
                          {invoice.note ?? " - "}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="ml-4 text-right">
                      <p
                        className={`text-lg font-bold ${
                          isPay ? "text-red-600" : "text-emerald-600"
                        }`}
                      >
                        {isPay ? "−" : "+"}৳ {invoice.paidAmount}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Total: ৳ {invoice.totalSaleAmount}
                      </p>

                      {invoice.extraCharge > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Extra: ৳ {invoice.extraCharge}
                        </p>
                      )}

                      <p className="mt-1 text-xs font-semibold text-red-500">
                        Due: ৳ {invoice.currentDueAmount}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </>
    </DialogWrapper>
  );
};

export default TodaysSalesAmount;
