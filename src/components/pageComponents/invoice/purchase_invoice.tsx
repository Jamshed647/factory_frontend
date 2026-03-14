/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFactoryInfo } from "@/utils/cookie/companyFactoryCookie";
import dateFormat from "@/utils/formatter/DateFormatter";
import { formatTwoDecimal } from "@/utils/formatter/DecimalFn";

export default function PurchaseInvoicePreview({ data }: { data: any }) {
  const factory = getFactoryInfo();

  // Calculate values with proper decimal formatting
  const totalPurchaseAmount = formatTwoDecimal(data?.totalPurchaseAmount || 0);
  const extraCharge = formatTwoDecimal(data?.extraCharge || 0);
  const discountAmount = formatTwoDecimal(data?.discountAmount || 0);
  const totalAmount = formatTwoDecimal(data?.totalAmount || 0);
  const paidAmount = formatTwoDecimal(data?.paidAmount || 0);
  const preDueAmount = formatTwoDecimal(data?.preDueAmount || 0);
  const currentDueAmount = formatTwoDecimal(data?.currentDueAmount || 0);
  const supplierDue = formatTwoDecimal(data?.supplier?.totalDueAmount || 0);

  return (
    <div
      className="p-6 mx-auto bg-white rounded-lg border shadow-sm print:shadow-none print:border-none"
      style={{ maxWidth: "800px", fontFamily: "Arial, sans-serif" }}
    >
      {/* Factory Header */}
      <div className="pb-4 mb-6 text-center border-b">
        <h1 className="text-2xl font-bold">
          {factory?.name || "Your Company Name"}
        </h1>
        {factory?.address && <p className="text-sm">{factory.address}</p>}
        {factory?.phone && <p className="text-sm">Tel: {factory.phone}</p>}
      </div>

      {/* Invoice Info */}
      <div className="flex justify-between items-start pb-4 mb-4 border-b">
        <div>
          <h2 className="text-xl font-semibold">Purchase Invoice</h2>
          <p className="text-sm">
            <span className="font-semibold">Invoice ID:</span>{" "}
            {data?.invoiceNo || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {dateFormat.fullDateTime(data?.date)}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Type:</span> PURCHASE
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm">
            <span className="font-semibold">Purchased By:</span>{" "}
            {data?.purchaserName || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Payment:</span>{" "}
            {data?.paymentMethod || "CASH"}
          </p>
          {data?.note && (
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {data.note}
            </p>
          )}
        </div>
      </div>

      {/* Supplier Info */}
      <div className="p-3 pb-4 mb-4 bg-gray-50 rounded-md border-b">
        <h3 className="mb-2 text-lg font-semibold">Supplier Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {data?.supplier?.name || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {data?.supplier?.phone || "N/A"}
            </p>
          </div>
          <div>
            {data?.supplier?.address && (
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {data.supplier.address}
              </p>
            )}
            {preDueAmount !== 0 && (
              <p>
                <span className="font-semibold text-orange-600">
                  Previous Due:
                </span>{" "}
                ৳{preDueAmount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold">Items</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-12 text-center">SL</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="w-24 text-right">Qty</TableHead>
              <TableHead className="w-32 text-right">Unit Price</TableHead>
              <TableHead className="w-32 text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.length ? (
              data.items.map((item: any, index: number) => (
                <TableRow key={item?.id || index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    {item?.product?.name || item?.productId || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatTwoDecimal(item?.quantity || 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{formatTwoDecimal(item?.buyPrice || 0)}
                  </TableCell>
                  <TableCell className="font-semibold text-right">
                    ৳{formatTwoDecimal(item?.totalPrice || 0)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-4 text-center text-gray-500"
                >
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="space-y-2 w-64 text-sm">
          <div className="flex justify-between">
            <span>Items Total:</span> <span>৳{totalPurchaseAmount}</span>
          </div>
          {extraCharge !== 0 && (
            <div className="flex justify-between">
              <span>Extra Charge:</span> <span>+ ৳{extraCharge}</span>
            </div>
          )}
          {discountAmount !== 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({data?.discountType || "N/A"}):</span>{" "}
              <span>- ৳{discountAmount}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 font-semibold border-t">
            <span>Grand Total:</span> <span>৳{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Paid:</span> <span>৳{paidAmount}</span>
          </div>
          {preDueAmount !== 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Previous Due:</span> <span>৳{preDueAmount}</span>
            </div>
          )}
          {currentDueAmount !== 0 && (
            <div className="flex justify-between font-semibold text-red-600">
              <span>Current Due:</span> <span>৳{currentDueAmount}</span>
            </div>
          )}
          {supplierDue !== 0 && (
            <div className="flex justify-between pt-2 font-semibold text-red-600 border-t">
              <span>Total Supplier Due:</span> <span>৳{supplierDue}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-xs text-center text-gray-500">
        <p>Thank you for your business!</p>
        <p className="mt-1">
          Invoice generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
