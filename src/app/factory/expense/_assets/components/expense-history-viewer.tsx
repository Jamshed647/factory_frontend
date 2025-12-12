/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import TransactionTable from "./transactionTable";
import TopExpensesCards from "./top-expense-cart";
import { useLanguage } from "@/hooks/useLanguage";

interface ExpenseDashboardProps {
  data: any;
  isLoading: boolean;
  // rangeType: string;
  // setRangeType: any;
}

export default function ExpenseDashboard({
  data,
  isLoading,
  // rangeType,
  // setRangeType,
}: ExpenseDashboardProps) {
  const { t } = useLanguage();

  return (
    <main>
      <div>
        {/* Range Type Filter */}
        {/* <div className="mb-6"> */}
        {/*   <RangeTypeFilter rangeType={rangeType} setRangeType={setRangeType} /> */}
        {/* </div> */}

        {/* Summary Cards */}
        {/* <div className="mb-8"> */}
        {/*   <SummaryCards data={data?.data} isLoading={isLoading} /> */}
        {/* </div> */}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">{t.topExpenses}</h2>
          <TopExpensesCards expenses={data?.data?.topFiveExpense || []} />
        </div>

        {/* Transaction History */}
        <div>
          <div className="py-4 rounded-md border shadow-2xl">
            <h2 className="mb-4 ml-4 text-xl font-semibold">
              {t.fullTransactionHistory}
            </h2>
            <TransactionTable
              transactions={data?.data?.history || []}
              isLoading={isLoading}
              pagination={data?.pagination}
              //   onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
