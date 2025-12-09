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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold capitalize">Factory Dashboard</h1>
            <p className="my-3 font-semibold capitalize text-muted-foreground">
              {" "}
              {name} - {address}
            </p>
          </div>

          <div className="flex gap-x-4">
            <Link href="/factory/sell/createSell">
              <ActionButton
                buttonContent="Sell Product"
                type="button"
                isPending={false}
                icon={<ShoppingCart className="w-5 h-5" />}
                btnStyle="bg-blue-500 text-white"
              />
            </Link>

            <Link href="/factory/productName">
              <ActionButton
                buttonContent="Product Name"
                type="button"
                icon={<Boxes className="w-5 h-5" />}
                btnStyle="bg-blue-500 text-white"
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
