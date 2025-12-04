/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {expenses.map((expense, idx) => (
        <div
          key={expense.id}
          className={`relative overflow-hidden border-l-4 ${borderColors[idx]} border rounded-lg bg-white hover:shadow-lg transition-all duration-300`}
        >
          {/* Content */}
          <div className="p-5">
            {/* Title as header */}
            <div className="mb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 line-clamp-2">
                    {expense.title}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <span className="py-1 px-2 text-xs text-gray-700 bg-gray-100 rounded">
                      {expense.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        expense.transactionType === "ONLINE"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {expense.transactionType}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-2">
                  {getTransactionIcon(expense.transactionType)}
                </div>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">
                ${expense.amount.toLocaleString()}
              </p>
              <div className="mt-1 text-xs text-gray-500">Rank #{idx + 1}</div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div>
                  {expense.bank ? (
                    <div className="space-y-1">
                      <div className="font-medium">{expense.bank.name}</div>
                      <div className="text-gray-500">{expense.bank.branch}</div>
                    </div>
                  ) : (
                    <div className="font-medium text-amber-700">
                      Cash Transaction
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {dateFormat.fullDateTime(expense.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
