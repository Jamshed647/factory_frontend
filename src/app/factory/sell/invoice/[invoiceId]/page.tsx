"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import SellInvoicePreview from "@/components/pageComponents/invoice/sell_invoice";
// import useSellInvoiceStore from "@/store/sellInvoiceStore";
import React from "react";

interface InvoicePageProps {
  params: Promise<{ invoiceId: string }>;
}

const SellInvoicePage = ({ params }: InvoicePageProps) => {
  const { invoiceId } = React.use(params);
  // const invoice = useSellInvoiceStore();

  const { data, isLoading } = useFetchData({
    path: `factory/sale/${invoiceId}`,
    queryKey: "getSingleInvoiceData",
  });

  //  console.log("TESt about invoice", data);

  return (
    <>
      <SellInvoicePreview data={data?.data} />
    </>
  );
};

export default SellInvoicePage;
