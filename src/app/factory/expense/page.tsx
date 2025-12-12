"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CashOverview } from "./_assets/components/factory-overview";
import { useState } from "react";
import ExpenseDashboard from "./_assets/components/expense-history-viewer";
import { useFactory } from "@/utils/factoryInfo";
import { CustomField } from "@/components/common/fields/cusField";

const CashPage = () => {
  const { factory } = useFactory();
  const [rangeType, setRangeType] = useState<
    "ALL" | "TODAY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "CUSTOM"
  >("TODAY");

  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const fromDate = lastYear.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/expense/factory/${factory?.id}?rangeType=${rangeType}&from=${fromDate}&to=${toDate}`,
    queryKey: "getExpenseDataByFactory",
  });

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Expense Analytics</h1>
          <p>Track and manage your factory expenses</p>
        </div>

        <CustomField.SingleSelectField
          name="rangeType"
          labelName="Range Type"
          defaultValue={rangeType}
          onValueChange={(e) => setRangeType(e)}
          options={["ALL", "TODAY", "WEEKLY", "MONTHLY", "CUSTOM"]}
          placeholder="Select Range Type"
        />
      </div>

      <div className="mx-auto space-y-6">
        <CashOverview financialData={data?.data} factory={factory} />
      </div>
      <ExpenseDashboard data={data} isLoading={isLoading} />
    </main>
  );
};

export default CashPage;
