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

export default function PurchaseInvoicePreview({ data }: { data: any }) {
  const factory = getFactoryInfo();
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

      {/* Header */}
      <div className="flex justify-between items-start pb-4 border-b">
        <div>
          <h1 className="text-xl font-bold">PURCHASE INVOICE</h1>
          <p className="text-sm">
            <span className="font-semibold">Invoice ID:</span>{" "}
            {data?.invoiceNo || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {dateFormat.fullDateTime(data?.date)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">
            Purchased By: {data?.purchaserName || "N/A"}
          </p>
          <p className="text-sm">
            Payment Method: {data?.paymentMethod || "CASH"}
          </p>
          {data?.note && (
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {data?.note}
            </p>
          )}
        </div>
      </div>

      {/* Supplier Info */}
      <div className="pb-4 mt-4 border-b">
        <h2 className="text-lg font-semibold">Supplier Details</h2>
        <div className="space-y-1 text-sm">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {data?.supplier?.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {data?.supplier?.phone || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {data?.supplier?.address || "N/A"}
          </p>
          <p className="pt-2 mt-2 font-semibold border-t">
            Total Due:{" "}
            <span className="text-red-600">
              ৳{data?.supplier?.totalDueAmount || 0}
            </span>
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Item List</h3>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-12 text-center">SL</TableHead>
                <TableHead>Product ID</TableHead>
                <TableHead className="w-24 text-right">Quantity</TableHead>
                <TableHead className="w-32 text-right">Unit Price</TableHead>
                <TableHead className="w-32 text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.items?.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {item?.name ?? item?.productId}
                  </TableCell>
                  <TableCell className="text-right">
                    {item?.quantity || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{item?.buyPrice || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{item?.totalPrice || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary */}

      <div className="flex justify-end">
        <div className="mt-6 w-64">
          {/* Each row as a flex container with margin-bottom */}
          <div className="flex justify-between mb-1">
            <span>Total Purchase Amount:</span>
            <span>৳{data?.totalPurchaseAmount || 0}</span>
          </div>

          {(data?.extraCharge || 0) > 0 && (
            <div className="flex justify-between mb-1">
              <span>Extra Charge:</span>
              <span>+ ৳{data?.extraCharge}</span>
            </div>
          )}

          {(data?.discountAmount || 0) > 0 && (
            <div className="flex justify-between mb-1 text-green-600">
              <span>Discount ({data?.discountType || ""}):</span>
              <span>- ৳{data?.discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 mb-1 font-semibold border-t">
            <span>Total Amount:</span>
            <span>৳{data?.totalAmount || 0}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span>Paid Amount:</span>
            <span>৳{data?.paidAmount || 0}</span>
          </div>

          {(data?.preDueAmount || 0) > 0 && (
            <div className="flex justify-between mb-1 text-orange-600">
              <span>Previous Due:</span>
              <span>৳{data?.preDueAmount}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 font-semibold text-red-600 border-t">
            <span>Current Due:</span>
            <span>৳{data?.currentDueAmount || 0}</span>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-8 text-xs text-center text-gray-500">
        <p>Thank you for your business.</p>
        <p className="mt-1">
          Invoice generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
