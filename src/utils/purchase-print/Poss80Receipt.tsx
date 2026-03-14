/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFactoryInfo } from "../cookie/companyFactoryCookie";
import dateFormat from "../formatter/DateFormatter";
import { formatTwoDecimal } from "../formatter/DecimalFn";

export const PurchasePos80Receipt = ({ data }: { data: any }) => {
  const factory = getFactoryInfo();

  return (
    <div
      style={{
        width: "72mm",
        padding: "2mm",
        backgroundColor: "white",
        fontFamily: "'Courier New', monospace",
        fontSize: "10px",
        lineHeight: 1.3,
        color: "#000",
      }}
    >
      {/* Store Header */}
      <div style={{ textAlign: "center", marginBottom: "2mm" }}>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          {factory?.name || "YOUR STORE"}
        </div>
        <div style={{ fontSize: "9px", marginBottom: "1mm" }}>
          PURCHASE INVOICE
        </div>
        <div
          style={{
            borderTop: "1px dashed #000",
            margin: "1mm 0",
          }}
        />
      </div>

      {/* Invoice Info */}
      <div style={{ marginBottom: "2mm", fontSize: "9px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Invoice:</span>
          <span>{data?.invoiceNo || "N/A"}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Date:</span>
          <span>{dateFormat.fullDateTime(data?.date)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Purchased By:</span>
          <span>{data?.purchaserName || "N/A"}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Payment:</span>
          <span>{data?.paymentMethod || "CASH"}</span>
        </div>

        <div
          style={{
            borderTop: "1px dashed #000",
            margin: "1mm 0",
          }}
        />
      </div>

      {/* Table Header */}
      <div
        style={{
          display: "flex",
          fontSize: "9px",
          fontWeight: "bold",
          marginBottom: "0.5mm",
        }}
      >
        <span style={{ width: "6%" }}>SL</span>
        <span style={{ width: "40%" }}>Product</span>
        <span style={{ width: "15%", textAlign: "center" }}>Qty</span>
        <span style={{ width: "20%", textAlign: "right" }}>Unit</span>
        <span style={{ width: "25%", textAlign: "right" }}>Total</span>
      </div>
      <div
        style={{
          borderTop: "1px dashed #000",
          margin: "0.5mm 0",
        }}
      />

      {/* Items */}
      <div style={{ marginBottom: "2mm" }}>
        {data?.items?.map((item: any, i: number) => (
          <div
            key={item.id}
            style={{ display: "flex", fontSize: "9px", marginTop: "0.8mm" }}
          >
            <span style={{ width: "6%" }}>{i + 1}</span>
            <span style={{ width: "40%" }}>
              {item?.product?.name ?? item.productId}
            </span>
            <span style={{ width: "15%", textAlign: "center" }}>
              {item?.quantity || 0}
            </span>
            <span style={{ width: "20%", textAlign: "right" }}>
              ৳{formatTwoDecimal(item?.buyPrice || 0)}
            </span>
            <span style={{ width: "25%", textAlign: "right" }}>
              ৳{formatTwoDecimal(item?.totalPrice || 0)}
            </span>
          </div>
        ))}
        <div
          style={{
            borderTop: "1px dashed #000",
            margin: "1mm 0",
          }}
        />
      </div>

      {/* Summary */}
      <div style={{ marginBottom: "2mm", fontSize: "9px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Total Purchase:</span>
          <span>৳{formatTwoDecimal(data?.totalPurchaseAmount || 0)}</span>
        </div>

        {data?.extraCharge > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5mm",
            }}
          >
            <span>Extra Charge:</span>
            <span>+ ৳{formatTwoDecimal(data?.extraCharge)}</span>
          </div>
        )}

        {data?.discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.5mm",
            }}
          >
            <span>Discount ({data?.discountType}):</span>
            <span>- ৳{formatTwoDecimal(data?.discountAmount)}</span>
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
          <span>Grand Total:</span>
          <span>৳{formatTwoDecimal(data?.totalAmount || 0)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5mm",
          }}
        >
          <span>Paid:</span>
          <span>৳{formatTwoDecimal(data?.paidAmount || 0)}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          <span>Due:</span>
          <span>৳{formatTwoDecimal(data?.currentDueAmount || 0)}</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          borderTop: "1px dashed #000",
          paddingTop: "1mm",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: "bold",
            marginBottom: "0.5mm",
          }}
        >
          THANK YOU!
        </div>
        <div style={{ fontSize: "7px" }}>
          Invoice generated on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
