"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import DueDialog from "./_assets/components/DueDialog";
import DueHistoryTable from "./_assets/components/DueHistoryTable";

export default function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/${slug}`,
    queryKey: "getSingleSupplierData",
  });

  const bank = data?.data;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <p className="text-xl font-bold"> Name: {bank?.name}</p>
          <p className="text-sm text-muted-foreground">
            Phone: {bank?.phone}
          </p>
          <p className="text-sm">Address: {bank?.address}</p>
        </CardHeader>

        <Separator />

        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Due</p>

            <p
              className={`text-2xl font-bold ${
                (bank?.totalDueAmount ?? 0) < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              ৳ {bank?.totalDueAmount ?? 0}
            </p>
          </div>
          <div className="flex gap-2">
            <DueDialog data={bank} type="PAY" />
            <DueDialog data={bank} type="TAKE" transactionType="CASH" />
          </div>
        </CardContent>
      </Card>

      <DueHistoryTable history={bank?.dueHistory} />
    </div>
  );
}
