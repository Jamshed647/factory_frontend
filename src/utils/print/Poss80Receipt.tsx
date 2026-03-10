import { Invoice } from "@/lib/invoice-types";
import { getFactoryInfo } from "../cookie/companyFactoryCookie";
import dateFormat from "../formatter/DateFormatter";

interface InvoicePOS80mmProps {
  data: Invoice;
}

export function Pos80Receipt({ data }: InvoicePOS80mmProps) {
  const factory = getFactoryInfo();

  const saleTotal = data.totalSaleAmount || 0;
  const discountAmount = data.discountAmount || 0;
  const discountType = data.discountType;
  const discountPercentage = data.discountPercentage;

  const extraCharge = data.extraCharge || 0;

  const previousDue = data.preDueAmount || 0;
  const grandTotal = data.totalAmount || 0;

  const paidAmount = data.paidAmount || 0;
  const currentDue = data.currentDueAmount || 0;

  const isQuickSell = !data.customer;

  const line = "-".repeat(32);

  return (
    <div
      style={{
        width: "72mm",
        padding: "1.5mm",
        backgroundColor: "white",
        fontFamily: "'Courier New', monospace",
        fontSize: "10px",
        lineHeight: "1.2",
        color: "#000",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1mm" }}>
        <div style={{ fontSize: "13px", fontWeight: "bold" }}>
          {factory?.name}
        </div>

        <div style={{ fontSize: "10px", fontWeight: "bold" }}>
          SALES RECEIPT
        </div>

        <div style={{ fontSize: "8px", letterSpacing: "1px" }}>{line}</div>
      </div>

      {/* Invoice Info */}
      <div style={{ marginBottom: "1mm" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Invoice:</span>
          <span>{data.invoiceNo}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Date:</span>
          <span>{dateFormat.fullDateTime(data.date)}</span>
        </div>
      </div>

      <div style={{ fontSize: "8px", letterSpacing: "1px" }}>{line}</div>

      {/* Customer */}
      <div style={{ margin: "1mm 0" }}>
        {isQuickSell ? (
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            Customer: Quick Sell
          </div>
        ) : (
          <>
            <div>
              <b>Customer:</b> {data.customer?.name}
            </div>

            <div>
              <b>Phone:</b> {data.customer?.phone}
            </div>

            {data.customer?.address && (
              <div>
                <b>Address:</b> {data.customer.address}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ fontSize: "8px", letterSpacing: "1px" }}>{line}</div>

      {/* Items Header */}
      <div style={{ marginTop: "1mm" }}>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            fontSize: "9px",
          }}
        >
          <span style={{ width: "40%" }}>Item</span>
          <span style={{ width: "15%", textAlign: "center" }}>Qty</span>
          <span style={{ width: "20%", textAlign: "right" }}>Price</span>
          <span style={{ width: "25%", textAlign: "right" }}>Total</span>
        </div>

        {data?.items?.map((item, index: number) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              fontSize: "9px",
              marginTop: "0.5mm",
            }}
          >
            <span style={{ width: "40%" }}>
              {item.productName || `Item ${index + 1}`}
            </span>

            <span style={{ width: "15%", textAlign: "center" }}>
              {item.quantity}
            </span>

            <span style={{ width: "20%", textAlign: "right" }}>
              {item.sellPrice.toFixed(2)}
            </span>

            <span style={{ width: "25%", textAlign: "right" }}>
              {item.totalPrice.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "8px", letterSpacing: "1px", marginTop: "1mm" }}>
        {line}
      </div>

      {/* Financial Summary */}
      <div style={{ marginTop: "1mm" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Items Total</span>
          <span>{saleTotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              Discount
              {discountType === "PERCENTAGE" && ` (${discountPercentage}%)`}
            </span>
            <span>-{discountAmount.toFixed(2)}</span>
          </div>
        )}

        {extraCharge > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Extra Charge</span>
            <span>{extraCharge.toFixed(2)}</span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Sale Total</span>
          <span>{saleTotal.toFixed(2)}</span>
        </div>

        {previousDue > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Previous Due</span>
            <span>{previousDue.toFixed(2)}</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            marginTop: "0.5mm",
          }}
        >
          <span>Grand Total</span>
          <span>{grandTotal.toFixed(2)}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Paid</span>
          <span>{paidAmount.toFixed(2)}</span>
        </div>

        {currentDue > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <span>Current Due</span>
            <span>{currentDue.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div style={{ fontSize: "8px", letterSpacing: "1px", marginTop: "1mm" }}>
        {line}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "1mm" }}>
        <div>
          <b>Payment:</b> {data.paymentMethod}
        </div>

        {data.paymentMethod === "BANK" && data.bank && (
          <div>Bank: {data.bank.name}</div>
        )}

        <div>Seller: {data.sellerName}</div>

        {data.note && <div>Note: {data.note}</div>}

        <div style={{ marginTop: "1mm", fontWeight: "bold" }}>
          Thank you for shopping!
        </div>
      </div>
    </div>
  );
}
