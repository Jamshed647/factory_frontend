"use client";
import PurchaseInvoicePreview from "@/components/pageComponents/invoice/purchase_invoice";
import usePurchaseInvoiceStore from "@/store/invoiceStore";

const PurchaseInvoicePage = () => {
  const invoice = usePurchaseInvoiceStore();
  console.log(invoice);

  return <PurchaseInvoicePreview data={invoice} />;
};

export default PurchaseInvoicePage;
