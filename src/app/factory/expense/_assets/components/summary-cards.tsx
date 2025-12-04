/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card } from "@/components/ui/card";
import {
  DollarSign,
  TrendingDown,
  Banknote,
  CreditCard,
  Dot,
} from "lucide-react";

interface SummaryCardsProps {
  data: any;
  isLoading: boolean;
}

export default function SummaryCards({ data, isLoading }: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Expenses",
      value: data?.totalHistoryAmount
        ? `$${data.totalHistoryAmount.toLocaleString()}`
        : "$0",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: "All time expenses",
    },
    {
      title: "Transaction Count",
      value: data?.totalHistory || 0,
      icon: TrendingDown,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Total transactions",
    },
    {
      title: "Top Expense",
      value: data?.topFiveExpense?.[0]?.amount
        ? `$${data.topFiveExpense[0].amount.toLocaleString()}`
        : "$0",
      icon: Banknote,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      description: "Highest single expense",
    },
    {
      title: "Online Transactions",
      value:
        data?.history?.filter((t: any) => t.transactionType === "ONLINE")
          .length || 0,
      icon: CreditCard,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      description: "Digital payments",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className={`transition-all duration-300 hover:shadow-lg ${card.borderColor} border-2`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className="text-xs font-xl">
                  <Dot strokeWidth={6} size={28} className={`${card.color}`} />
                </div>
              </div>

              <h3 className="mb-1 text-sm font-medium text-gray-600">
                {card.title}
              </h3>
              <p className={`text-2xl font-bold ${card.color} mb-2`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
