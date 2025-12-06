"use client";
import BankOverview from "@/components/pageComponents/dashboards/manager-dashboard/BankOverview";
import CashBalance from "@/components/pageComponents/dashboards/manager-dashboard/Cash-Balance";
import TodaysPurchaseAmount from "@/components/pageComponents/dashboards/manager-dashboard/Todays-purchase-amount";
import TodaysSalesAmount from "@/components/pageComponents/dashboards/manager-dashboard/Todays-sales-amount";
import TotalProfitLoss from "@/components/pageComponents/dashboards/manager-dashboard/Total-profit-loss";
import TotalExpenseOverview from "@/components/pageComponents/dashboards/manager-dashboard/TotalExpense";
import { useFactory } from "@/utils/factoryInfo";
import React from "react";

const AccountingComponents = () => {
  const { factory, isLoading } = useFactory();

  return (
    <div>
      {/* Table Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Accounting Overview</h2>
        {/* <div className="flex gap-x-2 items-center"> */}
        {/*   <CustomField.CommonSearch */}
        {/*     width="w-full" */}
        {/*     searchText={searchText} */}
        {/*     setSearchText={setSearchText} */}
        {/*   /> */}
        {/*   <CreateBankModal factoryId={factoryId as string} /> */}
        {/* </div> */}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TodaysSalesAmount factoryId={factory?.id} factoryLoading={isLoading} />

        <TodaysPurchaseAmount
          factoryId={factory?.id}
          factoryLoading={isLoading}
        />

        <TotalExpenseOverview
          factoryId={factory?.id}
          factoryLoading={isLoading}
        />

        <TotalProfitLoss factoryId={factory?.id} factoryLoading={isLoading} />

        <CashBalance factoryId={factory?.id} factoryLoading={isLoading} />

        <BankOverview factoryId={factory?.id} factoryLoading={isLoading} />
      </div>
    </div>
  );
};

export default AccountingComponents;
