/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionRow } from "./transactionRow";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";

export interface Transaction {
  id: string;
  cashAmountId: string;
  amount: number;
  type: "PAY" | "TAKE";
  transactionType: string;
  note: string | null;
  balance: number;
  createdAt: string;
}

interface CashHistoryViewerProps {
  bankId: string;
}

export function BankHistoryViewer({ bankId }: CashHistoryViewerProps) {
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterType, setFilterType] = useState<"all" | "PAY" | "TAKE">("all");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/history/${bankId}`,
    queryKey: "getBankHistoryData",
  });

  const transactions = data?.data?.data;

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") return transactions;
    return transactions.filter((t: any) => t.type === filterType);
  }, [transactions, filterType]);

  const sortedTransactions = useMemo(() => {
    const sorted = [...(filteredTransactions || [])];
    if (sortBy === "date") {
      sorted.reverse();
    } else {
      sorted.sort((a, b) => b.amount - a.amount);
    }
    return sorted;
  }, [filteredTransactions, sortBy]);

  return (
    <div className="space-y-6 w-full">
      {/* Transactions Section */}
      <Card className="border-0 shadow-sm">
        <div className="p-6 space-y-6">
          {/* Header with Controls */}
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Transaction History
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {sortedTransactions?.length} of {transactions?.length}{" "}
                transactions
              </p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Select
                value={filterType}
                onValueChange={(value: any) => setFilterType(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="TAKE">Received Only</SelectItem>
                  <SelectItem value="PAY">Paid Only</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value: any) => setSortBy(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Recent First</SelectItem>
                  <SelectItem value="amount">Largest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transaction List */}
          <div className="space-y-2">
            {sortedTransactions.length === 0 ? (
              <div className="py-12 text-center">
                <Filter className="mx-auto mb-4 w-12 h-12 text-muted-foreground/50" />
                <p className="font-medium text-muted-foreground">
                  No transactions found
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto space-y-2 max-h-96">
                {sortedTransactions.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
