/* eslint-disable @typescript-eslint/no-explicit-any */

export const Pos80Receipt = ({ data }: { data: any }) => {
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
      {/* Store Header */}
      <div style={{ textAlign: "center", marginBottom: "1mm" }}>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>YOUR STORE</div>
        <div style={{ fontSize: "9px" }}>123 Main Street</div>
        <div style={{ fontSize: "9px", marginBottom: "0.5mm" }}>
          Tel: 555-0123
        </div>
        <div style={{ fontSize: "8px", letterSpacing: "1px" }}>
          {"-".repeat(32)}
        </div>
      </div>

      {/* Invoice Info - Added for clarity */}
      <div style={{ marginBottom: "1mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
          }}
        >
          <span>Invoice:</span>
          <span>{data?.invoiceNo || "N/A"}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
          }}
        >
          <span>Date:</span>
          <span>Invoice generated on {data?.date || "N/A"}</span>
        </div>
      </div>

      {/* Seller & Payment Info */}
      <div style={{ marginBottom: "1mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
          }}
        >
          <span>Seller:</span>
          <span>{data?.sellerName || "Jamshed"}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
          }}
        >
          <span>Payment:</span>
          <span>{data?.paymentMethod || "CASH"}</span>
        </div>
        <div
          style={{ fontSize: "8px", letterSpacing: "1px", marginTop: "0.5mm" }}
        >
          {"-".repeat(32)}
        </div>
      </div>

      {/* Items Header */}
      <div style={{ marginBottom: "1mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "9px",
          }}
        >
          <span style={{ width: "40%" }}>Item</span>
          <span style={{ width: "15%", textAlign: "center" }}>Qty</span>
          <span style={{ width: "20%", textAlign: "right" }}>Price</span>
          <span style={{ width: "25%", textAlign: "right" }}>Total</span>
        </div>

        {/* Items */}
        {data?.items?.map((item: any, index: number) => (
          <div
            key={index}
            style={{ display: "flex", fontSize: "9px", marginTop: "0.5mm" }}
          >
            <span style={{ width: "40%" }}>{item?.productId || "Item"}</span>
            <span style={{ width: "15%", textAlign: "center" }}>
              {item?.quantity || 1}
            </span>
            <span style={{ width: "20%", textAlign: "right" }}>
              ৳{item?.sellPrice || 0}
            </span>
            <span style={{ width: "25%", textAlign: "right" }}>
              ৳{item?.totalPrice || 0}
            </span>
          </div>
        ))}

        <div
          style={{ fontSize: "8px", letterSpacing: "1px", marginTop: "0.5mm" }}
        >
          {"-".repeat(32)}
        </div>
      </div>

      {/* Totals */}
      <div style={{ marginBottom: "1mm" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
          }}
        >
          <span>Subtotal:</span>
          <span>৳{data?.totalSaleAmount || 0}</span>
        </div>

        {data?.discountAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "9px",
            }}
          >
            <span>Discount:</span>
            <span>-৳{data?.discountAmount}</span>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "10px",
            marginTop: "0.5mm",
          }}
        >
          <span>TOTAL:</span>
          <span>৳{data?.totalAmount || 0}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "9px",
            marginTop: "0.5mm",
          }}
        >
          <span>Paid:</span>
          <span>৳{data?.paidAmount || 0}</span>
        </div>

        {data?.currentDueAmount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "9px",
              color: "#dc2626",
            }}
          >
            <span>Due:</span>
            <span>৳{data?.currentDueAmount}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          borderTop: "1px dashed #000",
          paddingTop: "0.5mm",
          marginTop: "0.5mm",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: "bold" }}>THANK YOU!</div>
        <div style={{ fontSize: "8px" }}>Visit again</div>
        <div style={{ fontSize: "7px", marginTop: "0.5mm" }}>
          Invoice generated on {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
