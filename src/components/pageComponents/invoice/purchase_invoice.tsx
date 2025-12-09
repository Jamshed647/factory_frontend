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
import dateFormat from "@/utils/formatter/DateFormatter";

export default function PurchaseInvoicePreview({ data }: { data: any }) {
  return (
    <div className="p-8 mx-auto text-gray-900 bg-white rounded-lg border shadow-sm print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">Purchase Invoice</h1>

          <p className="text-sm">
            <span className="font-semibold">Invoice No:</span> {data.invoiceNo}
          </p>

          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {dateFormat.customFormatDate(data.date)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">
            Purchaser: {data.purchaserName}
          </p>
          <p className="text-sm">Payment Method: {data.paymentMethod}</p>
        </div>
      </div>

      {/* Supplier Info */}
      <div className="pb-4 mt-4 border-b">
        <h2 className="mb-2 text-lg font-semibold">Supplier Details</h2>

        <p className="text-sm">
          <span className="font-semibold">Name:</span>{" "}
          {data.supplier?.name ?? "N/A"}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Phone:</span>{" "}
          {data.supplier?.phone ?? "N/A"}
        </p>

        <p className="text-sm">
          <span className="font-semibold">Address:</span>{" "}
          {data.supplier?.address ?? "N/A"}
        </p>

        <p className="mt-1 text-sm">
          <span className="font-semibold">Total Supplier Due:</span>{" "}
          {data.supplier?.totalDueAmount ?? 0}
        </p>
      </div>

      {/* Items */}
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold">Item List</h3>

        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-12 text-center">SL</TableHead>
                <TableHead className="w-40">Product ID</TableHead>
                <TableHead className="w-20 text-right">Qty</TableHead>
                <TableHead className="w-32 text-right">Buy Price</TableHead>
                <TableHead className="w-32 text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.items.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>

                  {/* You will replace productId with actual product.name later */}
                  <TableCell className="font-medium">
                    {item.productId}
                  </TableCell>

                  <TableCell className="text-right">{item.quantity}</TableCell>

                  <TableCell className="text-right">
                    {item.updateBuyPrice ?? item.buyPrice}
                  </TableCell>

                  <TableCell className="text-right">
                    {item.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-end mt-6">
        <div className="space-y-1 w-64 text-sm">
          <div className="flex justify-between">
            <span>Total Purchase Amount:</span>
            <span>{data.totalPurchaseAmount}</span>
          </div>

          <div className="flex justify-between">
            <span>Extra Charge:</span>
            <span>{data.extraCharge}</span>
          </div>

          <div className="flex justify-between">
            <span>Discount:</span>
            <span>
              {data.discountType === "CASH"
                ? data.discountAmount
                : `${data.discountPercentage ?? 0}%`}
            </span>
          </div>

          <div className="flex justify-between pt-2 font-semibold border-t">
            <span>Total Amount:</span>
            <span>{data.totalAmount}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid:</span>
            <span>{data.paidAmount}</span>
          </div>

          <div className="flex justify-between font-semibold text-red-600">
            <span>Due Amount:</span>
            <span>{data.currentDueAmount}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-center text-gray-500">
        Thank you for your business.
      </div>
    </div>
  );
}
