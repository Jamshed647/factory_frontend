/* eslint-disable @typescript-eslint/no-explicit-any */
// app/reports/sell/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import {
  currentMonth,
  currentYear,
  MonthYearFilter,
} from "../_assets/components/MonthYearFilter";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { useFactory } from "@/utils/factoryInfo";

export default function SellReport() {
  const { factory } = useFactory();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/sale/monthly-sale`,
    queryKey: "getSellReportData",
    filterData: {
      factoryId: factory.id,
      month: selectedMonth,
      year: selectedYear,
    },
  });

  const reportData = data?.data || [];

  // Calculate totals
  const totals = reportData.reduce(
    (acc: any, item: any) => {
      acc.totalCount += item.count || 0;
      acc.totalPrice += item.totalPrice || 0;
      return acc;
    },
    { totalCount: 0, totalPrice: 0 },
  );

  // Add serial numbers to rows
  const rowsWithSl = reportData.map((item: any, index: number) => ({
    sl: index + 1,
    ...item,
  }));

  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg font-bold">
          <h3>Sell Report</h3>
          <MonthYearFilter
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            yearRange={3}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicTableWithPagination
          data={[
            ...rowsWithSl,
            {
              sl: null,
              date: "Total",
              count: totals.totalCount,
              totalPrice: totals.totalPrice,
            },
          ]}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          config={{
            columns: [
              {
                key: "sl",
                header: "SL",
                render: (row) => row.sl || "",
              },
              {
                key: "date",
                header: "Date",
                render: (row) => row.date,
              },
              {
                key: "count",
                header: "Number of Sales",
                render: (row) => (
                  <span className={row.sl === null ? "font-semibold" : ""}>
                    {row.count?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "totalPrice",
                header: "Total Selling Amount",
                render: (row) => (
                  <span
                    className={`${row.sl === null ? "font-semibold" : ""} text-green-600`}
                  >
                    ৳{row.totalPrice?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
            ],
          }}
        />
        <p className="mt-4 text-xs text-right text-muted-foreground">
          Filter: month-{selectedMonth}, year-{selectedYear}
        </p>
      </CardContent>
    </Card>
  );
}
