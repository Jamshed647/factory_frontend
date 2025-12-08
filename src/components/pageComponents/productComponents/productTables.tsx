"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import DeleteSalesmanModal from "./_assets/components/delete/deleteSalesmanModal";
import CreateProductModal from "./_assets/components/create/createProductModal";
import UpdateProductModal from "./_assets/components/update/updateProductModal";
import { useLanguage } from "@/hooks/useLanguage";

const ProductTable = ({ id }: { id?: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");
  const { t } = useLanguage();

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/product`,
    queryKey: "getProductDataByFactory",
    filterData: {
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold">{t.productList}</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateProductModal factoryId={id as string} />
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
              { key: "name", header: t.name },
              { key: "phone", header: t.contactInfo },
              { key: "status", header: t.status },
              { key: "buyPrice", header: t.buyPrice },
              { key: "sellPrice", header: t.sellPrice },
              {
                key: "factoryName",
                header: t.factoryName,
                render: (item) => item?.factory?.name,
              },
              {
                key: "action",
                header: t.action,
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateProductModal data={user} />
                    <DeleteSalesmanModal data={user} />
                  </ResponsiveButtonGroup>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ProductTable;
