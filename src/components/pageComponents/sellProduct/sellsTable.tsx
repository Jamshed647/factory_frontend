"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import ActionButton from "@/components/common/button/actionButton";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

const SalesTable = ({ factoryId }: { factoryId: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { t } = useLanguage();

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/sale/factory/${factoryId}`,
    queryKey: "getSalesDataByFactory",
    filterData: {
      type: status,
      search: searchText,
      page: currentPage,
    },
  });

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(1);
  };

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold">{t.sellsList}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />

            <div className="flex gap-2 justify-between">
              <CustomField.SingleSelectField
                name="status"
                options={["Quick", "Normal"]}
                placeholder={t.selectStatus}
                onValueChange={handleStatusChange}
                defaultValue={status}
              />

              <Link href="/factory/sell/createSell">
                <ActionButton
                  buttonContent={t.sellProduct}
                  type="button"
                  isPending={false}
                  icon={<ShoppingCart className="w-5 h-5" />}
                  btnStyle="bg-blue-500 text-white"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Table Body */}

        <DynamicTableWithPagination
          data={data?.data}
          isLoading={isLoading}
          pagination={data?.pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          config={{
            columns: [
              {
                key: "invoiceNo",
                header: t.invoiceNo,
              },
              {
                key: "date",
                header: t.date,
                render: (item) => new Date(item.date).toLocaleString(),
              },
              {
                key: "bank",
                header: t.customerName,
                render: (item) => item?.bank?.name,
              },
              {
                key: "phone",
                header: t.phone,
                render: (item) => item?.bank?.phone,
              },
              {
                key: "totalSaleAmount",
                header: t.totalSale,
              },
              {
                key: "paidAmount",
                header: t.paid,
              },
              {
                key: "discountAmount",
                header: t.discount,
              },
              {
                key: "paymentMethod",
                header: t.paymentMethod,
              },
              {
                key: "sellerName",
                header: t.seller,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default SalesTable;
