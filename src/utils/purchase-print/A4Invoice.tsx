/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { getFactoryInfo } from "../cookie/companyFactoryCookie";
import dateFormat from "../formatter/DateFormatter";

export const PurchaseA4Invoice = ({ data }: { data: any }) => {
  const factory = getFactoryInfo();

  return (
    <div
      className="mx-auto text-gray-900 bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontSize: "14px",
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start pb-4 border-b border-gray-300">
        <div>
          <h1 className="text-3xl font-bold">{factory?.name}</h1>
          <h1 className="font-bold text-gray-500 text-md">PURCHASE INVOICE</h1>
          <p className="mt-1 text-sm">
            <span className="font-semibold">Invoice ID:</span>{" "}
            {data.invoiceNo || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {dateFormat.fullDateTime(data.date)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">
            Purchased By: {data.purchaserName || "N/A"}
          </p>
          <p className="text-sm">
            Payment Method: {data.paymentMethod || "CASH"}
          </p>
          {data.note && (
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {data.note}
            </p>
          )}
        </div>
      </div>

      {/* Supplier Info */}
      <div className="py-4 border-b border-gray-300">
        <h2 className="mb-3 text-lg font-semibold">Supplier Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm">
              <span className="font-semibold">Name:</span>{" "}
              {data.supplier?.name || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Phone:</span>{" "}
              {data.supplier?.phone || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-semibold">Address:</span>{" "}
              {data.supplier?.address || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Previous Due:</span> ৳
              {data.preDueAmount?.toFixed(2) || "0.00"}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Items</h3>
        <div className="overflow-hidden rounded-md border border-gray-300">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-2 w-12 text-center border">SL</th>
                <th className="py-2 px-3 text-left border">Product</th>
                <th className="py-2 px-3 w-28 text-right border">Quantity</th>
                <th className="py-2 px-3 w-32 text-right border">Unit Price</th>
                <th className="py-2 px-3 w-32 text-right border">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items?.map((item: any, index: any) => (
                <tr key={item.id}>
                  <td className="py-2 px-2 text-center border">{index + 1}</td>
                  <td className="py-2 px-3 font-medium border">
                    {item.name ?? item.productId}
                  </td>
                  <td className="py-2 px-3 text-right border">
                    {item.quantity || 0}
                  </td>
                  <td className="py-2 px-3 text-right border">
                    ৳{item.buyPrice?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-2 px-3 text-right border">
                    ৳{item.totalPrice?.toFixed(2) || "0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="mt-8 space-y-2 w-80 text-sm">
          <div className="flex justify-between">
            <span>Total Purchase Amount:</span>
            <span>৳{data.totalPurchaseAmount?.toFixed(2) || "0.00"}</span>
          </div>
          {(data.extraCharge || 0) > 0 && (
            <div className="flex justify-between">
              <span>Extra Charge:</span>
              <span>+ ৳{data.extraCharge?.toFixed(2)}</span>
            </div>
          )}
          {(data.discountAmount || 0) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({data.discountType || ""})</span>
              <span>- ৳{data.discountAmount?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 font-semibold border-t">
            <span>Total Amount:</span>
            <span>৳{data.totalAmount?.toFixed(2) || "0.00"}</span>
          </div>
          <div className="flex justify-between">
            <span>Paid Amount:</span>
            <span>৳{data.paidAmount?.toFixed(2) || "0.00"}</span>
          </div>
          {(data.preDueAmount || 0) > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Previous Due:</span>
              <span>৳{data.preDueAmount?.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 font-semibold text-red-600 border-t">
            <span>Current Due:</span>
            <span>৳{data.currentDueAmount?.toFixed(2) || "0.00"}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-center text-gray-500">
        <p>Thank you for your business.</p>
        <p className="mt-1">
          Invoice generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
