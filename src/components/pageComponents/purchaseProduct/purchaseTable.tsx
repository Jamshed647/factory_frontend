"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import ActionButton from "@/components/common/button/actionButton";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import dateFormat from "@/utils/formatter/DateFormatter";
// import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
// import DeleteSalesmanModal from "./_assets/components/delete/deleteSalesmanModal";
// import CreateProductModal from "./_assets/components/create/createProductModal";
// import UpdateProductModal from "./_assets/components/update/updateProductModal";

const PurchaseTable = ({ factoryId }: { factoryId: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { t } = useLanguage();

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/purchase/factory/${factoryId}`,
    queryKey: "getPurchaseDataByFactory",
    filterData: {
      // type: "RAW",
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold">{t.purchaseList}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />

            <Link href="/factory/purchase/createPurchase">
              <ActionButton
                buttonContent={t.purchaseProduct}
                type="button"
                isPending={false}
                icon={<ShoppingCart className="w-5 h-5" />}
                btnStyle="bg-blue-500 text-white"
              />
            </Link>
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
                render: (item) =>
                  dateFormat.fullDateTime(item?.date, { showTime: false }),
              },
              {
                key: "supplier",
                header: t.supplier,
                render: (item) => item?.supplier?.name,
              },
              // {
              //   key: "phone",
              //   header: t.phone,
              //   render: (item) => item?.bank?.phone,
              // },
              {
                key: "totalPurchaseAmount",
                header: t.totalPurchaseAmount,
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

export default PurchaseTable;
