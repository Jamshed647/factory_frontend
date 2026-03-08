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

export default function SellInvoicePreview({ data }: { data: any }) {
  const invoiceDate = new Date(data?.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Calculate estimated profit safely
  const estimatedProfit =
    data?.items?.reduce((total: number, item: any) => {
      const sellPrice = item?.sellPrice || 0;
      const buyPrice = item?.buyPrice || 0;
      const quantity = item?.quantity || 0;
      return total + (sellPrice - buyPrice) * quantity;
    }, 0) || 0;

  return (
    <div className="p-4 mx-auto text-gray-900 bg-white rounded-lg border shadow-sm print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex justify-between items-start pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-sm">
            <span className="font-semibold">Invoice ID:</span>{" "}
            {data?.invoiceNo || "N/A"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span> {invoiceDate}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Type:</span> {data?.type || "N/A"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">
            Seller: {data?.sellerName || "N/A"}
          </p>
          <p className="text-sm">
            Payment Method: {data?.paymentMethod || "N/A"}
          </p>
          {data?.note && (
            <p className="text-sm">
              <span className="font-semibold">Note:</span> {data.note}
            </p>
          )}
        </div>
      </div>

      {/* Customer Info */}
      <div className="pb-4 mt-4 border-b">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">
            {data?.bank ? "Customer Details" : "Quick Sell"}
          </h2>

          {!data?.bank && (
            <span className="py-1 px-3 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              Quick Sell Mode
            </span>
          )}
        </div>

        {data?.bank ? (
          <div className="space-y-1 text-sm">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {data.bank.name || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {data.bank.phone || "N/A"}
            </p>

            <p>
              <span className="font-semibold">Address:</span>{" "}
              {data.bank.address || "N/A"}
            </p>

            <p className="pt-2 mt-2 font-semibold border-t">
              Total Due:{" "}
              <span className="text-red-600">
                ৳{data.bank.totalDueAmount || 0}
              </span>
            </p>
          </div>
        ) : (
          <div className="p-3 text-sm text-gray-600 bg-gray-50 rounded-md border">
            This sale is recorded as a{" "}
            <span className="font-semibold">Quick Sell</span>. Customer
            information was not entered for this transaction.
          </div>
        )}
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
                <TableRow key={item?.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {item?.productId || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {item?.quantity || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{item?.sellPrice || 0}
                  </TableCell>
                  <TableCell className="text-right">
                    ৳{item?.totalPrice || 0}
                  </TableCell>
                </TableRow>
              )) || (
                <TableRow>
                  <TableCell colSpan={5} className="py-4 text-center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-end mt-6">
        <div className="space-y-2 w-64 text-sm">
          <div className="flex justify-between">
            <span>Total Sale Amount:</span>
            <span>৳{data?.totalSaleAmount || 0}</span>
          </div>

          {(data?.extraCharge || 0) > 0 && (
            <div className="flex justify-between">
              <span>Extra Charge:</span>
              <span>+ ৳{data?.extraCharge}</span>
            </div>
          )}

          {(data?.discountAmount || 0) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({data?.discountType || "N/A"}):</span>
              <span>- ৳{data?.discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 font-semibold border-t">
            <span>Total Amount:</span>
            <span>৳{data?.totalAmount || 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid Amount:</span>
            <span>৳{data?.paidAmount || 0}</span>
          </div>

          {(data?.preDueAmount || 0) > 0 && (
            <div className="flex justify-between text-orange-600">
              <span>Previous Due:</span>
              <span>৳{data?.preDueAmount}</span>
            </div>
          )}

          <div className="flex justify-between pt-2 font-semibold text-red-600 border-t">
            <span>Current Due:</span>
            <span>৳{data?.currentDueAmount || 0}</span>
          </div>

          {/* Profit Calculation */}
          <div className="flex justify-between pt-2 text-blue-600 border-t">
            <span>Estimated Profit:</span>
            <span>৳{estimatedProfit.toFixed(2)}</span>
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
