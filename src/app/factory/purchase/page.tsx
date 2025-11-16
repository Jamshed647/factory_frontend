"use client";

import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import { CookieCart } from "@/utils/cookie/cart-utils";
import { useState } from "react";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import { useAuth } from "@/hooks/hooks";
import DataLoader from "@/components/common/GlobalLoader/dataLoader";
import SelectSupplier from "./_assets/components/selectSupplier";
import { SelectProductComponent } from "@/components/pageComponents/purchaseProduct/SelectProductComponent";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { user } = useAuth();
  const factoryId = user?.factoryId || getFactoryId();

  const cart = CookieCart("purchase_products");

  const [selectedProducts, setSelectedProducts] = useState<
    {
      id: string;
      limit: number;
      name: string;
      sellPrice: number;
      stock: number;
    }[]
  >(cart.get());

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "factory/product",
    queryKey: "getProductDataByFactory",
    filterData: { search: searchTerm, page },
  });

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="col-span-1 lg:col-span-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Select Products</h1>
        </div>

        {/* Search */}
        <div className="mb-4">
          <CustomField.CommonSearch
            placeholder="Search product"
            width="w-full"
            searchText={searchTerm}
            setSearchText={setSearchTerm}
          />
        </div>

        {isLoading ? (
          <>
            <DataLoader />
          </>
        ) : (
          <SelectProductComponent
            products={data?.data}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            mode="multiple"
          />
        )}
      </div>

      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Select Customer</h1>
        </div>

        <SelectSupplier
          enabled={selectedProducts.length > 0}
          factoryId={factoryId as string}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
