import { Boxes, ShoppingCart } from "lucide-react";
import ActionButton from "@/components/common/button/actionButton";
import Link from "next/link";
import TodaysSalesAmount from "./manager-dashboard/Todays-sales-amount";
import TodaysPurchaseAmount from "./manager-dashboard/Todays-purchase-amount";
import TotalProfitLoss from "./manager-dashboard/Total-profit-loss";
import CashBalance from "./manager-dashboard/Cash-Balance";
import MultiCard from "./manager-dashboard/MultiCard";
import BankOverview from "./manager-dashboard/BankOverview";
import { IFactoryInfo } from "@/utils/factoryInfo";
import TotalExpenseOverview from "./manager-dashboard/TotalExpense";

export function ManagerDashboard({
  factory,
  isLoading,
}: {
  factory: IFactoryInfo;
  isLoading: boolean;
}) {
  const { id: factoryId, name, address } = factory;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:justify-between lg:items-center">
          {/* Title */}
          <div className="min-w-0">
            <h1 className="text-xl font-bold capitalize sm:text-2xl lg:text-3xl">
              Factory Dashboard
            </h1>

            <p className="mt-1 text-sm font-semibold break-words sm:text-base text-muted-foreground">
              {name} - {address}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 w-full sm:flex-row lg:w-auto">
            <Link href="/factory/sell/createSell" className="w-full sm:w-auto">
              <ActionButton
                buttonContent="Sell Product"
                type="button"
                isPending={false}
                icon={<ShoppingCart className="w-5 h-5" />}
                btnStyle="bg-blue-500 text-white w-full sm:w-auto"
              />
            </Link>

            <Link href="/factory/productName" className="w-full sm:w-auto">
              <ActionButton
                buttonContent="Product Name"
                type="button"
                icon={<Boxes className="w-5 h-5" />}
                btnStyle="bg-blue-500 text-white w-full sm:w-auto"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TodaysSalesAmount factoryId={factoryId} factoryLoading={isLoading} />

        <TodaysPurchaseAmount
          factoryId={factoryId}
          factoryLoading={isLoading}
        />
        <BankOverview factoryId={factoryId} factoryLoading={isLoading} />
        <TotalProfitLoss factoryId={factoryId} factoryLoading={isLoading} />
        <TotalExpenseOverview
          factoryId={factoryId}
          factoryLoading={isLoading}
        />
        <CashBalance factoryId={factoryId} factoryLoading={isLoading} />

        <MultiCard factoryId={factoryId} factoryLoading={isLoading} />
      </div>
    </>
  );
}
