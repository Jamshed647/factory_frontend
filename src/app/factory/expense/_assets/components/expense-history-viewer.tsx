/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import TransactionTable from "./transactionTable";
import TopExpensesCards from "./top-expense-cart";
import SummaryCards from "./summary-cards";

interface ExpenseDashboardProps {
  data: any;
  isLoading: boolean;
  rangeType: string;
  setRangeType: any;
  page: number;
  setPage: any;
}

export default function ExpenseDashboard({
  data,
  isLoading,
  rangeType,
  setRangeType,
  page,
  setPage,
}: ExpenseDashboardProps) {
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
          <h2 className="mb-4 text-xl font-semibold">Top 5 Expenses</h2>
          <TopExpensesCards expenses={data?.data?.topFiveExpense || []} />
        </div>

        {/* Transaction History */}
        <div>
          <div className="py-4 rounded-md border shadow-2xl">
            <h2 className="mb-4 ml-4 text-xl font-semibold">
              Full Transaction History
            </h2>
            <TransactionTable
              transactions={data?.data?.history || []}
              isLoading={isLoading}
              pagination={data?.pagination}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
