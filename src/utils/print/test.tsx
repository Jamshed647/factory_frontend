import { Invoice } from "@/lib/invoice-types";
import { format } from "date-fns";

interface InvoicePOS80mmProps {
  data: Invoice;
  businessName?: string;
  businessPhone?: string;
}

export function InvoicePOS80mm({
  data,
  businessName = "Your Business",
  businessPhone = "Phone",
}: InvoicePOS80mmProps) {
  const invoiceDate = new Date(data.date);
  const formattedDate = format(invoiceDate, "dd/MM/yyyy HH:mm");

  const itemsTotal = data.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = data.discountAmount || 0;
  const extraCharge = data.extraCharge || 0;

  const netTotal = itemsTotal - discountAmount;
  const finalTotal = netTotal + extraCharge;

  const isQuickSell = !data.customer;

  return (
    <div className="mx-auto w-80 font-mono text-xs leading-tight text-gray-900 bg-white">
      {/* Header */}
      <div className="pb-2 mb-2 text-center border-b border-gray-900">
        <p className="text-sm font-bold">{businessName}</p>
        <p className="text-xs">{businessPhone}</p>
        <p className="mt-1 text-xs font-bold">SALES RECEIPT</p>
      </div>

      {/* Invoice Info */}
      <div className="pb-2 mb-2 text-center border-b border-gray-400">
        <p>
          <span className="font-bold">Invoice:</span> {data.invoiceNo}
        </p>
        <p>{formattedDate}</p>
      </div>

      {/* Customer */}
      <div className="pb-2 mb-2 border-b border-gray-400">
        {isQuickSell ? (
          <p className="font-bold text-center">Quick Sell</p>
        ) : (
          <>
            <p className="font-bold">{data.customer?.name}</p>
            <p>{data.customer?.phone}</p>
          </>
        )}
      </div>

      {/* Items */}
      <div className="pb-2 mb-2 border-b border-gray-400">
        <div className="flex justify-between pb-1 mb-1 font-bold border-b border-gray-300">
          <span className="flex-1">Item</span>
          <span className="w-8 text-right">Qty</span>
          <span className="w-16 text-right">Amt</span>
        </div>

        {data.items.map((item, index) => (
          <div key={item.id} className="flex justify-between mb-1">
            <span className="flex-1">
              {item.productName || `Item ${index + 1}`}
            </span>
            <span className="w-8 text-right">{item.quantity}</span>
            <span className="w-16 font-semibold text-right">
              {item.totalPrice.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="pb-2 mb-2 border-b border-gray-400">
        <div className="flex justify-between mb-1">
          <span>Subtotal</span>
          <span>{itemsTotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between mb-1">
            <span>Discount</span>
            <span>-{discountAmount.toFixed(2)}</span>
          </div>
        )}

        {extraCharge > 0 && (
          <div className="flex justify-between mb-1">
            <span>Extra Charge</span>
            <span>{extraCharge.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-1 mt-1 font-bold border-t border-gray-900">
          <span>TOTAL</span>
          <span>{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment */}
      <div className="pb-2 mb-2 text-center border-b border-gray-400">
        <p>
          <span className="font-bold">Payment:</span> {data.paymentMethod}
        </p>

        {data.paymentMethod === "bank" && data.bank && (
          <p className="text-xs">Bank: {data.bank.name || "N/A"}</p>
        )}
      </div>

      {/* Footer */}
      <div className="pt-1 text-xs text-center border-t border-gray-900">
        <p>Thank you for shopping!</p>
        <p>{format(invoiceDate, "yyyy-MM-dd HH:mm:ss")}</p>
      </div>
    </div>
  );
}
