"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import DueDialog from "./_assets/components/DueDialog";
import { BankHistoryViewer } from "./_assets/components/bank-history-viewer";

export default function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/bank/${slug}`,
    queryKey: "getSingleBankData",
  });

  const bank = data?.data;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <p className="text-xl font-bold"> Name: {bank?.name}</p>
          <p className="text-sm text-muted-foreground">
            Account No: {bank?.accountNo}
          </p>
          <p className="text-sm">Branch Name: {bank?.branch}</p>
        </CardHeader>

        <Separator />

        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Due</p>

            <p
              className={`text-2xl font-bold ${
                bank?.balance < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              ৳ {bank?.balance}
            </p>
          </div>
          <div className="flex gap-2">
            <DueDialog bank={bank} type="PAY" />
            <DueDialog bank={bank} type="TAKE" />
          </div>
        </CardContent>
      </Card>

      <BankHistoryViewer bankId={slug as string} />
    </div>
  );
}
