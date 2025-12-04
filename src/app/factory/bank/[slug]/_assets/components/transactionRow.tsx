import dateFormat from "@/utils/formatter/DateFormatter";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction } from "./cash-history-viewer";
import EditCashNote from "./EditCashNote";

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isPay = transaction.type === "PAY";

  return (
    <div className="flex justify-between items-center p-4 rounded-lg border transition-colors border-border/50 hover:bg-muted/50 hover:border-border">
      {/* Left Section: Icon + Details */}
      <div className="flex flex-1 gap-4 items-center min-w-0">
        {/* Icon Container */}
        <div
          className={`flex-shrink-0 p-3 rounded-lg ${
            isPay
              ? "bg-red-50 dark:bg-red-950"
              : "bg-emerald-50 dark:bg-emerald-950"
          }`}
        >
          {isPay ? (
            <ArrowDownLeft
              className={`w-5 h-5 text-red-600 dark:text-red-400`}
            />
          ) : (
            <ArrowUpRight
              className={`w-5 h-5 text-emerald-600 dark:text-emerald-400`}
            />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 items-center mb-1">
            <p className="font-semibold text-foreground truncate">
              {transaction.transactionType}
            </p>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                isPay
                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                  : "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {isPay ? "PAID" : "RECEIVED"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {dateFormat.fullDateTime(transaction.createdAt)}
          </p>
          <div className="flex gap-4 items-center">
            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
              <span className="font-semibold">Note:</span>{" "}
              {transaction?.note ?? " - "}
            </p>
            <EditCashNote
              note={transaction?.note as string}
              cashId={transaction?.id as string}
            />
          </div>
        </div>
      </div>

      {/* Right Section: Amount + Balance */}
      <div className="flex flex-shrink-0 gap-4 items-end ml-4">
        <div className="text-right">
          <p
            className={`text-lg font-bold ${
              isPay
                ? "text-red-600 dark:text-red-400"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isPay ? "−" : "+"}৳ {transaction.amount}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            Balance: ৳ {transaction.balance.toLocaleString("bn-BD")}
          </p>
        </div>
      </div>
    </div>
  );
}
