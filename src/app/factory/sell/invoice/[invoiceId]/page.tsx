/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import SellInvoicePreview from "@/components/pageComponents/invoice/sell_invoice";
import { useState } from "react";
import { usePrint } from "@/hooks/usePrint";
// import { useDownloadOneClick } from "@/hooks/useDownload";
import { Pos80Receipt } from "@/utils/print/Poss80Receipt";
import { A4Invoice } from "@/utils/print/A4Invoice";
import { InvoicePOS80mm } from "@/utils/print/test";

interface InvoicePageProps {
  params: Promise<{ invoiceId: string }>;
}

const SellInvoicePage = ({ params }: InvoicePageProps) => {
  const { invoiceId } = React.use(params);
  const [format, setFormat] = useState<"A4" | "POS_80">("A4");

  const { data, isLoading } = useFetchData({
    path: `factory/sale/${invoiceId}`,
    queryKey: "getSingleInvoiceData",
  });

  const { componentRef: printRef, printWithSize } = usePrint();

  //  const { downloadRef, download } = useDownloadOneClick();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

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
        {/* <button */}
        {/*   onClick={download} */}
        {/*   className="py-2 px-4 mt-4 text-white bg-black" */}
        {/* > */}
        {/*   Download PDF */}
        {/* </button>{" "} */}
        {/* <PDFDownloadLink */}
        {/*   document={<SellInvoicePreview data={data?.data} format="A4" />} */}
        {/*   fileName="invoice.pdf" */}
        {/*   className="py-2 px-4 text-white bg-black" */}
        {/* > */}
        {/*   {({ loading }) => */}
        {/*     loading ? "Preparing document..." : "Download PDF" */}
        {/*   } */}
        {/* </PDFDownloadLink> */}
      </div>

      {/* Hidden print area */}
      <div className="hidden">
        <div ref={printRef}>
          {format === "POS_80" ? (
            <Pos80Receipt data={data} />
          ) : (
            <A4Invoice data={data} />
          )}
        </div>{" "}
      </div>

      {/* Preview */}
      <div className="p-4 rounded border">
        <SellInvoicePreview data={data?.data} />
      </div>
      {/* <div className="p-4 rounded border border-amber-600"> */}
      {/*   <InvoicePOS80mm data={data?.data} /> */}
      {/* </div> */}
    </div>
  );
};

export default SellInvoicePage;
