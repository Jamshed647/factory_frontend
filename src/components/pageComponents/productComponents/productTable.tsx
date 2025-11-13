"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import DeleteSalesmanModal from "./_assets/components/delete/deleteSalesmanModal";
import CreateProductModal from "./_assets/components/create/createProductModal";
import UpdateProductModal from "./_assets/components/update/updateProductModal";

const ProductTable = ({ id }: { id?: string }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    // path: `auth/salesman/factory/${id}`,
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
          <h2 className="text-2xl font-bold">Product List</h2>
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
              { key: "name", header: "Name" },
              { key: "phone", header: "Contact Info" },
              { key: "status", header: "Status" },
              { key: "buyPrice", header: "Buy Price" },
              { key: "sellPrice", header: "Sell Price" },
              {
                key: "factoryName",
                header: "Factory Owner Id",
                render: (item) => item?.factory?.name,
              },
              {
                key: "action",
                header: "Action",
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
