"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import DynamicTableWithPagination from "@/components/common/DynamicTable/DynamicTable";
import { CustomField } from "@/components/common/fields/cusField";
import React from "react";
import { ResponsiveButtonGroup } from "@/components/common/button/responsiveButtons";
import { useAuth } from "@/hooks/hooks";
import CreateProductNameModal from "./_assets/component/createProductModal";
import dateFormat from "@/utils/formatter/DateFormatter";
import UpdateProductNameModal from "./_assets/component/updateProductNameModal";

const ProductNamePage = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchText, setSearchText] = React.useState("");

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/category/factory/${user?.factoryId}`,
    queryKey: "getProductNameData",
    filterData: {
      type: "sell-product",
      search: searchText,
      page: currentPage,
    },
  });

  return (
    <div className="mt-10">
      <div className="rounded-md border shadow-lg">
        {/* Table Header */}
        <div className="flex justify-between items-center p-3">
          <h2 className="text-2xl font-bold"> Product Name List</h2>
          <div className="flex gap-x-2 items-center">
            <CustomField.CommonSearch
              width="w-full"
              searchText={searchText}
              setSearchText={setSearchText}
            />
            <CreateProductNameModal factoryId={user?.factoryId as string} />
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
              { key: "categoryName", header: "Name" },
              { key: "categoryType", header: "Type" },
              {
                key: "date",
                header: "Created At",
                render: (user) =>
                  dateFormat.fullDateTime(user.createdAt, { showTime: false }),
              },
              {
                key: "action",
                header: "Action",
                render: (user) => (
                  <ResponsiveButtonGroup>
                    <UpdateProductNameModal
                      factoryId={user?.factoryId as string}
                      data={user}
                      componentType="edit"
                    />
                    {/* <DeleteSalesmanModal data={user} /> */}
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

export default ProductNamePage;
