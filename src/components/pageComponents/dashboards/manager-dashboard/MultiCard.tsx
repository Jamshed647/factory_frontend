import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import { MetricCard } from "@/components/ui/metric-card";
import {
  Boxes,
  DollarSign,
  FileText,
  ShoppingBasket,
  TrendingUp,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import React from "react";

const MultiCard = ({ factoryId }: { factoryId: string }) => {
  const [type, setType] = React.useState("TODAY");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `dashboard/factory/${factoryId}`,
    queryKey: "getInvoiceDataByFactory",
    filterData: {
      rangeType: type,
      history: false,
    },
  });

  return (
    <>
      {/* FULL WIDTH + SMALL HEIGHT */}
      <div className="col-span-full h-10">
        <div className="flex gap-3 justify-between items-center">
          <h2 className="text-lg font-bold text-foreground">
            {type === "DAILY" ? "Today" : type}
          </h2>
          <div onClick={(e) => e.stopPropagation()}>
            <CustomField.SingleSelectField
              name="cashHistory"
              placeholder="Select Range"
              options={["ALL", "TODAY", "WEEKLY", "MONTHLY"]}
              defaultValue={type}
              onValueChange={(value: string) => setType?.(value)}
            />
          </div>
        </div>
      </div>

      {/* Total Invoices */}
      <MetricCard
        isLoading={isLoading}
        title="Total Invoices"
        value={data?.data?.totalInvoices}
        description="Number of invoices created"
        icon={<FileText className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Total Customers */}
      <MetricCard
        isLoading={isLoading}
        title="Total Customers"
        value={data?.data?.totalCustomers}
        description="Total active banks"
        icon={<Users className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Customers Due */}
      <MetricCard
        isLoading={isLoading}
        title="Customers Due"
        value={data?.data?.banksDue}
        description="Customers who owe money"
        icon={<UserMinus className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Total Suppliers */}
      <MetricCard
        isLoading={isLoading}
        title="Total Suppliers"
        value={data?.data?.totalSuppliers}
        description="Total suppliers added"
        icon={<UserCheck className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Suppliers Due */}
      <MetricCard
        isLoading={isLoading}
        title="Suppliers Due"
        value={data?.data?.suppliersDue}
        description="Money owed to suppliers"
        icon={<UserMinus className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Total Raw Product */}
      <MetricCard
        isLoading={isLoading}
        title="Total Raw Product"
        value={data?.data?.raw?.totalRawProduct}
        description="Types of raw materials"
        icon={<Boxes className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Raw Product Quantity */}
      {/* <MetricCard */}
      {/*   isLoading={isLoading} */}
      {/*   title="Raw Product Quantity" */}
      {/*   value={data?.data?.raw?.rawProductQuantity} */}
      {/*   description="Total quantity available" */}
      {/*   icon={<Package className="w-4 h-4 text-muted-foreground" />} */}
      {/* /> */}

      {/* Raw Product Amount */}
      <MetricCard
        isLoading={isLoading}
        title="Raw Product Amount"
        value={data?.data?.raw?.rawProductAmount}
        description="Total cost of raw materials"
        icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Total Sell Product */}
      <MetricCard
        isLoading={isLoading}
        title="Total Sell Product"
        value={data?.data?.sell?.totalSellProduct}
        description="Types of products sold"
        icon={<ShoppingBasket className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Sell Product Quantity */}
      {/* <MetricCard */}
      {/*   isLoading={isLoading} */}
      {/*   title="Sell Product Quantity" */}
      {/*   value={data?.data?.sell?.sellProductQuantity} */}
      {/*   description="Total quantity sold" */}
      {/*   icon={<Package className="w-4 h-4 text-muted-foreground" />} */}
      {/* /> */}

      {/* Sell Product Amount */}
      <MetricCard
        isLoading={isLoading}
        title="Sell Product Amount"
        value={data?.data?.sell?.sellProductAmount}
        description="Total income from sales"
        icon={<TrendingUp className="w-4 h-4 text-muted-foreground" />}
      />

      {/* Total Investment */}
      <MetricCard
        isLoading={isLoading}
        title="Total Investment"
        value={data?.data?.totalInvestment}
        description="Total money invested"
        icon={<DollarSign className="w-4 h-4 text-muted-foreground" />}
      />
    </>
  );
};

export default MultiCard;
