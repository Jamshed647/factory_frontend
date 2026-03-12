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

  return (
    <div
      style={{
        width: "72mm",
        padding: "2mm",
        backgroundColor: "white",
        fontFamily: "'Courier New', monospace",
        fontSize: "10px",
        lineHeight: "1.3",
        color: "#000",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2mm" }}>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          {factory?.name}
        </div>

        <div
          style={{ fontSize: "10px", fontWeight: "bold", marginTop: "0.5mm" }}
        >
          SALES RECEIPT
        </div>

        <div
          style={{
            borderTop: "1px dashed #000",
            marginTop: "1mm",
            width: "100%",
          }}
        />
      </div>

      {/* Invoice Info */}
      <div style={{ marginBottom: "2mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1mm",
          }}
        >
          <span>Invoice:</span>
          <span>{data.invoiceNo}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1mm",
          }}
        >
          <span>Date:</span>
          <span>{dateFormat.fullDateTime(data.date)}</span>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px dashed #000",
          margin: "1mm 0",
          width: "100%",
        }}
      />

      {/* Customer */}
      <div style={{ marginBottom: "2mm" }}>
        {isQuickSell ? (
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "1mm",
            }}
          >
            Customer: Quick Sell
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "0.5mm" }}>
              <b>Customer:</b> {data.customer?.name}
            </div>

            <div style={{ marginBottom: "0.5mm" }}>
              <b>Phone:</b> {data.customer?.phone}
            </div>

            {data.customer?.address && (
              <div style={{ marginBottom: "0.5mm" }}>
                <b>Address:</b> {data.customer.address}
              </div>
            )}
          </>
        )}
      </div>

      <div
        style={{
          borderTop: "1px dashed #000",
          margin: "1mm 0",
          width: "100%",
        }}
      />

      {/* Items Header */}
      <div style={{ marginBottom: "1mm" }}>
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            fontSize: "9px",
            marginBottom: "0.5mm",
          }}
        >
          <span style={{ width: "6%" }}>SL</span>
          <span style={{ width: "40%" }}>Product</span>
          <span style={{ width: "15%", textAlign: "center" }}>Qty</span>
          <span style={{ width: "20%", textAlign: "right" }}>Unit</span>
          <span style={{ width: "25%", textAlign: "right" }}>Total</span>
        </div>

        {data?.items?.map((item, i: number) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              fontSize: "9px",
              marginTop: "0.8mm",
            }}
          >
            <span style={{ width: "6%" }}>{i + 1}</span>
            <span style={{ width: "40%" }}>
              {item?.name || item?.productId}
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

      <div
        style={{
          borderTop: "1px dashed #000",
          margin: "1mm 0",
          width: "100%",
        }}
      />

      {/* Financial Summary */}
      <div style={{ marginBottom: "2mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Items Total</span>
          <span>{saleTotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5mm",
            }}
          >
            <span>
              Discount
              {discountType === "PERCENTAGE" && ` (${discountPercentage}%)`}
            </span>
            <span>-{discountAmount.toFixed(2)}</span>
          </div>
        )}

        {extraCharge > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5mm",
            }}
          >
            <span>Extra Charge</span>
            <span>{extraCharge.toFixed(2)}</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Sale Total</span>
          <span>{saleTotal.toFixed(2)}</span>
        </div>

        {previousDue > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5mm",
            }}
          >
            <span>Previous Due</span>
            <span>{previousDue.toFixed(2)}</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            marginBottom: "0.5mm",
          }}
        >
          <span>Grand Total</span>
          <span>{grandTotal.toFixed(2)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
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

      <div
        style={{
          borderTop: "1px dashed #000",
          margin: "1mm 0",
          width: "100%",
        }}
      />

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "1.5mm" }}>
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
