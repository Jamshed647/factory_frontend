// components/cash-overview.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Banknote, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import DueDialog from "./DueDialog";

interface CashTransaction {
  id: string;
  amount: number;
  type: "PAY" | "TAKE";
  transactionType: string;
  note: string | null;
  balance: number;
  createdAt: string;
}

interface CashOverviewProps {
  transactions: CashTransaction[];
  factory?:
    | {
        id?: string;
        name?: string;
        status?: "ACTIVE" | "INACTIVE";
        address?: string;
      }
    | string;
  currentBalance: number;
}

export function CashOverview({
  transactions = [],
  factory,
  currentBalance,
}: CashOverviewProps) {
  // Calculate metrics
  const totalTaken = transactions
    ?.filter((t) => t?.type === "TAKE")
    ?.reduce((sum, t) => sum + t?.amount, 0);

  const totalPaid = transactions
    ?.filter((t) => t?.type === "PAY")
    ?.reduce((sum, t) => sum + t?.amount, 0);

  // const netFlow = totalTaken - totalPaid;
  //
  // const takeTransactionsCount = transactions.filter(
  //   (t) => t.type === "TAKE",
  // ).length;
  // const payTransactionsCount = transactions.filter(
  //   (t) => t.type === "PAY",
  // ).length;

  const lastTransactionDate =
    transactions.length > 0
      ? new Date(transactions[transactions.length - 1].createdAt)
      : null;

  const isPositive = currentBalance >= 0;

  return (
    <div className="space-y-4">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-r border-0 shadow-lg from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
            {/* Primary Balance Info */}
            <div className="space-y-3">
              <div className="flex gap-3 items-center">
                <div
                  className={`p-2 rounded-lg ${
                    isPositive
                      ? "bg-emerald-50 dark:bg-emerald-950"
                      : "bg-red-50 dark:bg-red-950"
                  }`}
                >
                  <Banknote
                    className={`w-5 h-5 ${
                      isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-muted-foreground">
                    Current Balance
                  </p>
                  <p
                    className={`text-3xl font-bold ${
                      isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    ৳ {Math.abs(currentBalance ?? 0)}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {isPositive ? "(Cash)" : "(Due)"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Context Info */}
              <div className="flex flex-wrap gap-4 text-sm">
                {factory && (
                  <div>
                    <p className="text-muted-foreground">Factory</p>
                    <p className="font-medium">
                      {typeof factory === "string" ? factory : factory.name}
                    </p>
                  </div>
                )}
                {lastTransactionDate && (
                  <div>
                    <p className="text-muted-foreground">Last Activity</p>
                    <p className="font-medium">
                      {format(lastTransactionDate, "MMM dd, yyyy")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 min-w-[180px]">
              <div className="p-3 text-center rounded-lg bg-white/50 dark:bg-slate-800/50">
                <TrendingUp className="mx-auto mb-1 w-4 h-4 text-emerald-600" />
                <p className="text-xs text-muted-foreground">Received</p>
                <p className="text-sm font-semibold">৳ {totalTaken}</p>
              </div>
              <div className="p-3 text-center rounded-lg bg-white/50 dark:bg-slate-800/50">
                <TrendingDown className="mx-auto mb-1 w-4 h-4 text-red-600" />
                <p className="text-xs text-muted-foreground">Paid</p>
                <p className="text-sm font-semibold">৳ {totalPaid}</p>
              </div>
              <div></div>

              {/* Right: Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-end md:flex-nowrap">
                <DueDialog factory={factory} type="TAKE" />
                <DueDialog factory={factory} type="PAY" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Secondary Metrics */}
      {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2"> */}
      {/*   <Card className="border-0 shadow-sm"> */}
      {/*     <div className="p-4"> */}
      {/*       <div className="flex justify-between items-center mb-3"> */}
      {/*         <p className="text-sm font-medium text-muted-foreground"> */}
      {/*           Net Cash Flow */}
      {/*         </p> */}
      {/*         <ArrowUpRight */}
      {/*           className={`w-4 h-4 ${ */}
      {/*             netFlow >= 0 ? "text-blue-500" : "text-orange-500" */}
      {/*           }`} */}
      {/*         /> */}
      {/*       </div> */}
      {/*       <p */}
      {/*         className={`text-xl font-bold ${ */}
      {/*           netFlow >= 0 ? "text-blue-600" : "text-orange-600" */}
      {/*         }`} */}
      {/*       > */}
      {/*         {netFlow >= 0 ? "+" : ""}৳{" "} */}
      {/*         {Math.abs(netFlow).toLocaleString("bn-BD")} */}
      {/*       </p> */}
      {/*     </div> */}
      {/*   </Card> */}
      {/**/}
      {/*   // Transaction Summary  */}
      {/*   <Card className="border-0 shadow-sm"> */}
      {/*     <div className="p-4"> */}
      {/*       <div className="flex justify-between items-center mb-3"> */}
      {/*         <p className="text-sm font-medium text-muted-foreground"> */}
      {/*           Transactions */}
      {/*         </p> */}
      {/*         <Calendar className="w-4 h-4 text-slate-500" /> */}
      {/*       </div> */}
      {/*       <div className="flex gap-4 text-sm"> */}
      {/*         <div className="flex gap-2 items-center"> */}
      {/*           <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> */}
      {/*           <span>{takeTransactionsCount} In</span> */}
      {/*         </div> */}
      {/*         <div className="flex gap-2 items-center"> */}
      {/*           <div className="w-2 h-2 bg-red-500 rounded-full"></div> */}
      {/*           <span>{payTransactionsCount} Out</span> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </Card> */}
      {/* </div> */}
    </div>
  );
}
