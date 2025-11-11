"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import DueHistoryTable from "./_assets/DueHistoryTable";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import React from "react";
import DueDialog from "./_assets/DueDialog";

export default function SupplierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/supplier/${slug}`,
    queryKey: "getSingleSupplierData",
  });

  const supplier = data?.data;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <p className="text-xl font-bold"> Name: {supplier?.name}</p>
          <p className="text-sm text-muted-foreground">
            Phone: {supplier?.phone}
          </p>
          <p className="text-sm">Address: {supplier?.address}</p>
        </CardHeader>

        <Separator />

        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Current Due</p>
            <p className="text-2xl font-bold text-red-500">
              ৳ {supplier?.totalDueAmount ?? 0}
            </p>
          </div>
          <div className="flex gap-2">
            <DueDialog data={supplier} type="PAY" />
            <DueDialog data={supplier} type="TAKE" />
          </div>
        </CardContent>
      </Card>

      <DueHistoryTable history={supplier?.dueHistory} />
    </div>
  );
}
