"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { useAuth } from "@/hooks/hooks";
import { CashOverview } from "./_assets/components/factory-overview";
import { useState } from "react";
import ExpenseDashboard from "./_assets/components/expense-history-viewer";

const CashPage = () => {
  const { user } = useAuth();
  const factory = user?.factory;
  const [rangeType, setRangeType] = useState<
    "ALL" | "TODAY" | "WEEKLY" | "MONTHLY"
  >("ALL");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/expense/factory/${factory?.id}`,
    queryKey: "getExpenseDataByFactory",
    filterData: {
      rangeType: rangeType,
      page: page,
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
        page={page}
        setPage={setPage}
      />
    </main>
  );
};

export default CashPage;
