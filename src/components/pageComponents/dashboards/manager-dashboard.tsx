import { Boxes, ShoppingCart } from "lucide-react";
import ActionButton from "@/components/common/button/actionButton";
import Link from "next/link";
import TodaysSalesAmount from "./manager-dashboard/Todays-sales-amount";
import TodaysPurchaseAmount from "./manager-dashboard/Todays-purchase-amount";
import TotalProfitLoss from "./manager-dashboard/Total-profit-loss";
import CashBalance from "./manager-dashboard/Cash-Balance";
import MultiCard from "./manager-dashboard/MultiCard";
import BankOverview from "./manager-dashboard/BankOverview";

export function ManagerDashboard({ factoryId }: { factoryId: string }) {
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Factory Dashboard</h1>
            <p className="text-muted-foreground">Muri Master - Dhaka Factory</p>
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
        <TodaysSalesAmount factoryId={factoryId} />

        <TodaysPurchaseAmount factoryId={factoryId} />
        <TotalProfitLoss factoryId={factoryId} />

        <CashBalance factoryId={factoryId} />

        <MultiCard factoryId={factoryId} />
        <BankOverview factoryId={factoryId} />
      </div>
    </>
  );
}
