/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import PurchaseInvoicePreview from "@/components/pageComponents/invoice/purchase_invoice";
import { usePrint } from "@/hooks/usePrint";
import { PurchaseA4Invoice } from "@/utils/purchase-print/A4Invoice";
import { PurchasePos80Receipt } from "@/utils/purchase-print/Poss80Receipt";
import React, { useState } from "react";

interface InvoicePageProps {
  params: Promise<{ invoiceId: string }>;
}

const PurchaseInvoicePage = ({ params }: InvoicePageProps) => {
  const { invoiceId } = React.use(params);
  const [format, setFormat] = useState<"A4" | "POS_80">("POS_80");

  const { data, isLoading } = useFetchData({
    path: `factory/purchase/${invoiceId}`,
    queryKey: "getSingleInvoiceData",
  });
  const { componentRef: printRef, printWithSize } = usePrint();

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4 items-center">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as any)}
          className="p-2 rounded border"
        >
          <option value="A4">A4</option>
          <option value="POS_80">POS 80mm</option>
        </select>
        <button
          onClick={() => printWithSize(format)}
          className="py-2 px-4 text-white bg-blue-600 rounded"
        >
          Print
        </button>
      </div>

      {/* Hidden print area */}
      <div className="hidden">
        <div ref={printRef}>
          {format === "POS_80" ? (
            <PurchasePos80Receipt data={data?.data} />
          ) : (
            <PurchaseA4Invoice data={data?.data} />
          )}
        </div>{" "}
      </div>

      {/* Preview */}
      <div className="p-4 rounded border">
        <PurchaseInvoicePreview data={data?.data} />
      </div>
    </div>
  );
};

export default PurchaseInvoicePage;
