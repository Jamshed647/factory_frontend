"use client";
import SellInvoicePreview from "@/components/pageComponents/invoice/sell_invoice";
import useSellInvoiceStore from "@/store/sellInvoiceStore";

const SellInvoicePage = () => {
  const invoice = useSellInvoiceStore();

  return <SellInvoicePreview data={invoice} />;
};

export default SellInvoicePage;
