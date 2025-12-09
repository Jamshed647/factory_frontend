"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import PurchaseInvoicePreview from "@/components/pageComponents/invoice/purchase_invoice";
import React from "react";

interface InvoicePageProps {
  params: Promise<{ invoiceId: string }>;
}

const PurchaseInvoicePage = ({ params }: InvoicePageProps) => {
  const { invoiceId } = React.use(params);

  const { data, isLoading } = useFetchData({
    path: `factory/purchase/${invoiceId}`,
    queryKey: "getSingleInvoiceData",
  });

  const invoice = data?.data;

  return <PurchaseInvoicePreview data={invoice} />;
};

export default PurchaseInvoicePage;
