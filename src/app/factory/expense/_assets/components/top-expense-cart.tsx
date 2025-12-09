/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import dateFormat from "@/utils/formatter/DateFormatter";
import { CreditCard, Banknote } from "lucide-react";

interface TopExpensesCardsProps {
  expenses: any[];
}

export default function TopExpensesCards({ expenses }: TopExpensesCardsProps) {
  const getTransactionIcon = (type: string) => {
    return type === "ONLINE" ? (
      <CreditCard className="w-5 h-5" />
    ) : (
      <Banknote className="w-5 h-5" />
    );
  };

  const borderColors = [
    "border-l-emerald-500",
    "border-l-blue-500",
    "border-l-amber-500",
    "border-l-violet-500",
    "border-l-rose-500",
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {expenses.map((expense, idx) => (
        <div
          key={expense.id}
          className="overflow-hidden relative bg-gradient-to-br from-white via-white to-gray-50 rounded-xl border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-2xl group"
        >
          {/* Colored accent line */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1.5"
            style={{ backgroundColor: borderColors[idx] }}
          />

          {/* Content container */}
          <div className="relative py-4 pr-4 pl-5">
            {/* Header row */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="pr-2 mb-1 text-lg font-bold text-gray-900 truncate">
                  {expense.title}
                </h3>
              </div>
              <div className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                {getTransactionIcon(expense.transactionType)}
              </div>
            </div>

            {/* Amount - Focus point */}
            <div className="mb-4">
              <p className="text-3xl font-black tracking-tight text-gray-900">
                ${expense.amount.toLocaleString()}
              </p>
            </div>

            {/* Transaction details - Minimal */}
            <div className="pt-3 space-y-2 border-t border-gray-100">
              <div className="flex gap-2 items-center">
                {expense.bank ? (
                  <>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="text-sm">
                      <span className="font-semibold text-blue-600">
                        {expense.bank.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({expense.bank.branch})
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-amber-600">
                      Cash Payment
                    </span>
                  </>
                )}
              </div>

              {/* Date */}
              <div className="flex gap-1.5 items-center text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  {dateFormat.fullDateTime(expense.createdAt, {
                    showTime: false,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Subtle hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 via-white/0"></div>
        </div>
      ))}
    </div>
  );
}
