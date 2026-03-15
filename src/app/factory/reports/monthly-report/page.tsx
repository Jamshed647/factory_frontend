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

export default function MonthlyReport() {
  const { factory } = useFactory();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/report/monthly`,
    queryKey: "getMonthlyReportData",
    filterData: {
      factoryId: factory.id,
      month: selectedMonth,
      year: selectedYear,
    },
  });

  const { total, rows } = data?.data || { total: {}, rows: [] };

  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between text-lg font-bold">
          <h3>Monthly Report</h3>
          <MonthYearFilter
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            yearRange={3} // Optional: show 3 years before and after
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DynamicTableWithPagination
          data={[...rows, { date: "Total", ...total }]}
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
                key: "totalBuying",
                header: "Total Buying",
                render: (row) => (
                  <span className={row.sl === null ? "font-semibold" : ""}>
                    {row.totalBuying?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "totalSelling",
                header: "Total Selling",
                render: (row) => (
                  <span className={row.sl === null ? "font-semibold" : ""}>
                    {row.totalSelling?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "totalProfit",
                header: "Total Profit",
                render: (row) => (
                  <span
                    className={`${row.sl === null ? "font-semibold" : ""} ${
                      row.totalProfit > 0 ? "text-green-600" : ""
                    }`}
                  >
                    {row.totalProfit?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "totalLoss",
                header: "Total Loss",
                render: (row) => (
                  <span
                    className={`${row.sl === null ? "font-semibold" : ""} ${
                      row.totalLoss > 0 ? "text-red-600" : ""
                    }`}
                  >
                    {row.totalLoss?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "totalCost",
                header: "Total Cost",
                render: (row) => (
                  <span className={row.sl === null ? "font-semibold" : ""}>
                    {row.totalCost?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
              {
                key: "netProfit",
                header: "Net Profit",
                render: (row) => (
                  <span
                    className={`${row.sl === null ? "font-semibold" : ""} ${
                      row.netProfit > 0
                        ? "text-green-600"
                        : row.netProfit < 0
                          ? "text-red-600"
                          : ""
                    }`}
                  >
                    {row.netProfit?.toLocaleString()}
                  </span>
                ),
                className: "text-right",
              },
            ],
          }}
        />
        {/* Filter hint showing month-year format */}
        <p className="mt-4 text-xs text-right text-muted-foreground">
          Filter: month-{selectedMonth}, year-{selectedYear}
        </p>
      </CardContent>
    </Card>
  );
}
