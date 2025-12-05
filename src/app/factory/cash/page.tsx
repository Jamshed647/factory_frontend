/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { useAuth } from "@/hooks/hooks";
import { CashHistoryViewer } from "./_assets/components/cash-history-viewer";
import { CashOverview } from "./_assets/components/cash-overview";
import CashHistoryDialog from "./_assets/components/cash-history-dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { useState } from "react";

const CashPage = () => {
  const [rangeType, setRangeType] = useState<"DAILY" | "WEEKLY" | "MONTHLY">(
    "DAILY",
  );
  const { user } = useAuth();
  const factory = user?.factory;

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/cash/history/${factory?.id}`,
    queryKey: "getCashDataByFactory",
  });

  const balanceInfo = data?.data[0];

  return (
    <main>
      <div className="mx-auto space-y-6">
        <CashOverview
          transactions={balanceInfo?.cashAmountHistories}
          factory={factory}
          currentBalance={balanceInfo?.balance}
        />

        <div className="p-3 space-y-3 rounded-lg border shadow-md">
          <div className="flex gap-3 justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">
              {rangeType === "DAILY" ? "Today" : rangeType}
            </h2>
            <CustomField.SingleSelectField
              name="cashHistory"
              placeholder="Select Range"
              options={["DAILY", "WEEKLY", "MONTHLY"]}
              defaultValue={rangeType}
              onValueChange={(value: any) => setRangeType(value)}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <CashHistoryDialog type="cashIn" rangeType={rangeType} />
            <CashHistoryDialog type="cashOut" rangeType={rangeType} />
          </div>
        </div>

        {/* Transaction History */}
        <CashHistoryViewer transactions={balanceInfo?.cashAmountHistories} />
      </div>
    </main>
  );
};

export default CashPage;
