"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CashOverview } from "./_assets/components/factory-overview";
import { useState } from "react";
import ExpenseDashboard from "./_assets/components/expense-history-viewer";
import { useFactory } from "@/utils/factoryInfo";

const CashPage = () => {
  const { factory } = useFactory();
  const [rangeType, setRangeType] = useState<
    "ALL" | "TODAY" | "WEEKLY" | "MONTHLY"
  >("ALL");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/expense/factory/${factory?.id}`,
    queryKey: "getExpenseDataByFactory",
    filterData: {
      rangeType: rangeType,
    },
  });

  return (
    <main>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Expense Analytics</h1>
        <p>Track and manage your factory expenses</p>
      </div>

      <div className="mx-auto space-y-6">
        <CashOverview financialData={data?.data} factory={factory} />
      </div>
      <ExpenseDashboard
        data={data}
        isLoading={isLoading}
        rangeType={rangeType}
        setRangeType={setRangeType}
      />
    </main>
  );
};

export default CashPage;
