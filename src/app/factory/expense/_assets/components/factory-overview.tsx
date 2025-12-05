import { Card } from "@/components/ui/card";
import {
  Building,
  MapPin,
  DollarSign,
  TrendingDown,
  Banknote,
  CreditCard,
} from "lucide-react";
import AddExpenseDialog from "./AddExpense";

interface CashOverviewProps {
  factory?:
    | {
        id?: string;
        name?: string;
        status?: "ACTIVE" | "INACTIVE";
        address?: string;
      }
    | string;
  financialData?: {
    totalHistoryAmount?: number;
    totalHistory?: number;
    topFiveExpense?: Array<{ amount: number }>;
    history?: Array<{
      transactionType: string;
      amount: number;
      date: string;
      isOnline?: boolean;
    }>;
    // Add current and previous period data for trends
    currentPeriod?: {
      totalAmount: number;
      transactionCount: number;
      topExpense: number;
      onlineCount: number;
    };
    previousPeriod?: {
      totalAmount: number;
      transactionCount: number;
      topExpense: number;
      onlineCount: number;
    };
    // Add balance and due data
    balance?: number;
    dueAmount?: number;
  };
}

export function CashOverview({ factory, financialData }: CashOverviewProps) {
  const getFactoryInfo = () => {
    if (!factory)
      return {
        name: "Select Factory",
        status: "INACTIVE" as const,
        address: "No factory selected",
      };
    if (typeof factory === "string")
      return { name: factory, status: "ACTIVE" as const, address: "" };
    return {
      name: factory.name || "Factory",
      address: factory.address || "",
      status: factory.status || "INACTIVE",
    };
  };

  const factoryInfo = getFactoryInfo();
  const isActive = factoryInfo.status === "ACTIVE";

  // Helper function to calculate percentage change
  const calculateTrend = (current: number, previous: number): string => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  // Get current values
  const currentTotalAmount = financialData?.totalHistoryAmount || 0;
  const currentTransactionCount = financialData?.totalHistory || 0;
  const currentTopExpense = financialData?.topFiveExpense?.[0]?.amount || 0;

  // Calculate online transactions count from history
  const onlineTransactionsCount =
    financialData?.history?.filter((t) => t.transactionType === "ONLINE")
      .length || 0;

  // Get previous period values (you might need to fetch these separately)
  const previousTotalAmount = financialData?.previousPeriod?.totalAmount || 0;
  const previousTransactionCount =
    financialData?.previousPeriod?.transactionCount || 0;
  const previousTopExpense = financialData?.previousPeriod?.topExpense || 0;
  const previousOnlineCount = financialData?.previousPeriod?.onlineCount || 0;

  // Calculate trends
  const totalExpensesTrend = calculateTrend(
    currentTotalAmount,
    previousTotalAmount,
  );
  const transactionsTrend = calculateTrend(
    currentTransactionCount,
    previousTransactionCount,
  );
  const topExpenseTrend = calculateTrend(currentTopExpense, previousTopExpense);
  const onlineTrend = calculateTrend(
    onlineTransactionsCount,
    previousOnlineCount,
  );

  // Summary cards with dynamic data
  const summaryCards = [
    {
      title: "Total Expenses",
      value: currentTotalAmount
        ? `$${currentTotalAmount.toLocaleString()}`
        : "$0",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: totalExpensesTrend,
      trendColor:
        currentTotalAmount >= previousTotalAmount
          ? "text-emerald-600"
          : "text-red-600",
    },
    {
      title: "Transactions",
      value: currentTransactionCount.toLocaleString(),
      icon: TrendingDown,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: transactionsTrend,
      trendColor:
        currentTransactionCount >= previousTransactionCount
          ? "text-emerald-600"
          : "text-red-600",
    },
    {
      title: "Top Expense",
      value: currentTopExpense
        ? `$${currentTopExpense.toLocaleString()}`
        : "$0",
      icon: Banknote,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      trend: topExpenseTrend,
      trendColor:
        currentTopExpense >= previousTopExpense
          ? "text-amber-600"
          : "text-blue-600",
    },
    {
      title: "Online",
      value: onlineTransactionsCount.toLocaleString(),
      icon: CreditCard,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      trend: onlineTrend,
      trendColor:
        onlineTransactionsCount >= previousOnlineCount
          ? "text-violet-600"
          : "text-orange-600",
    },
  ];

  return (
    <div className="mb-4 space-y-4">
      {/* Combined Header Card */}
      <Card className="bg-white border">
        <div className="p-5">
          <div className="flex flex-col gap-5 justify-between items-start md:flex-row">
            {/* Factory & Stats */}
            <div className="flex-1">
              <div className="flex gap-4 items-start mb-4">
                <div
                  className={`p-3 rounded-lg ${isActive ? "bg-emerald-50" : "bg-amber-50"}`}
                >
                  <Building
                    className={`w-6 h-6 ${isActive ? "text-emerald-600" : "text-amber-600"}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex gap-3 items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {factoryInfo.name}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {factoryInfo.status}
                    </span>
                  </div>

                  {factoryInfo.address && (
                    <div className="flex gap-2 items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {factoryInfo.address}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <AddExpenseDialog factory={factory} />
                {/* <DueDialog factory={factory} type="PAY" /> */}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Summary Cards - Only show once */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="p-4 bg-white border">
              <div className="flex gap-3 items-center mb-3">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {card.title}
                  </div>
                  <div className={`text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </div>
                </div>
              </div>
              {/* <div className={`text-xs ${card.trendColor} font-medium`}> */}
              {/*   {card.trend} from last month */}
              {/* </div> */}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
