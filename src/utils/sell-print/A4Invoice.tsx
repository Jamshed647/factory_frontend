/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getFactoryInfo } from "../cookie/companyFactoryCookie";

export const A4Invoice = ({ data }: { data: any }) => {
  const factory = getFactoryInfo();

  const invoiceDate = new Date(data?.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const saleTotal = data?.totalSaleAmount || 0;
  const discountAmount = data?.discountAmount || 0;
  const discountType = data?.discountType;
  const discountPercentage = data?.discountPercentage;

  const extraCharge = data?.extraCharge || 0;

  const previousDue = data?.preDueAmount || 0;
  const grandTotal = data?.totalAmount || 0;

  const paidAmount = data?.paidAmount || 0;
  const currentDue = data?.currentDueAmount || 0;

  const isQuickSell = !data?.customer;

  return (
    <div
      className="mx-auto text-gray-900 bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start pb-4 border-b border-gray-300">
        <div>
          <h1 className="text-3xl font-bold">{factory?.name}</h1>
          <p className="text-sm text-gray-600">SALES INVOICE</p>
        </div>

        <div className="text-right">
          <p>
            <span className="font-semibold">Invoice:</span>{" "}
            {data?.invoiceNo || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {invoiceDate}
          </p>
          <p>
            <span className="font-semibold">Seller:</span>{" "}
            {data?.sellerName || "N/A"}
          </p>
        </div>
      </div>

      {/* Customer */}
      <div className="py-4 border-b border-gray-300">
        <h2 className="mb-3 text-lg font-semibold">Customer Details</h2>

        {isQuickSell ? (
          <p className="font-semibold">Customer: Quick Sell</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {data?.customer?.name}
              </p>

              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {data?.customer?.phone}
              </p>
            </div>

            <div>
              {data?.customer?.address && (
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {data.customer.address}
                </p>
              )}

              {previousDue > 0 && (
                <p>
                  <span className="font-semibold">Previous Due:</span> ৳
                  {previousDue.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Items</h3>r{" "}
        <div className="overflow-hidden rounded-md border border-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 w-12 text-center border">SL</th>
                <th className="py-2 px-3 text-left border">Product</th>
                <th className="py-2 px-3 w-24 text-right border">Qty</th>
                <th className="py-2 px-3 w-32 text-right border">unit Price</th>
                <th className="py-2 px-3 w-32 text-right border">Total</th>
              </tr>
            </thead>

            <tbody>
              {data?.items?.map((item: any, index: number) => (
                <tr key={item?.id} style={{ pageBreakInside: "avoid" }}>
                  <td className="py-2 px-2 text-center border">{index + 1}</td>

                  <td className="py-2 px-3 border">
                    {item?.name || item?.productId || "N/A"}
                  </td>

                  <td className="py-2 px-3 text-right border">
                    {item?.quantity}
                  </td>

                  <td className="py-2 px-3 text-right border">
                    ৳{item?.sellPrice?.toFixed(2)}
                  </td>

                  <td className="py-2 px-3 font-semibold text-right border">
                    ৳{item?.totalPrice?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="flex justify-end mt-8">
        <div className="space-y-2 w-80 text-sm">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>৳{saleTotal.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>
                Discount
                {discountType === "PERCENTAGE" && ` (${discountPercentage}%)`}
              </span>
              <span>- ৳{discountAmount.toFixed(2)}</span>
            </div>
          )}

          {extraCharge > 0 && (
            <div className="flex justify-between">
              <span>Extra Charge</span>
              <span>+ ৳{extraCharge.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 font-semibold border-t">
            <span>Sale Total</span>
            <span>৳{saleTotal.toFixed(2)}</span>
          </div>

          {previousDue > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Previous Due</span>
              <span>৳{previousDue.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 font-bold border-t">
            <span>Grand Total</span>
            <span>৳{grandTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid</span>
            <span>৳{paidAmount.toFixed(2)}</span>
          </div>

          {currentDue > 0 && (
            <div className="flex justify-between font-bold text-red-600">
              <span>Current Due</span>
              <span>৳{currentDue.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-10">
        <p>
          <span className="font-semibold">Payment Method:</span>{" "}
          {data?.paymentMethod}
        </p>

        {data?.paymentMethod === "BANK" && data?.bank && (
          <p>
            <span className="font-semibold">Bank:</span> {data.bank.name}
          </p>
        )}

        {data?.note && (
          <p>
            <span className="font-semibold">Note:</span> {data.note}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-xs text-center text-gray-500">
        <p>Thank you for shopping with us.</p>
        <p className="mt-1">
          Invoice generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
