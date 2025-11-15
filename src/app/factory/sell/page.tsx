/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { SelectProductComponent } from "@/components/pageComponents/sellProduct/SelectProductComponent";
import { useState } from "react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: "factory/product",
    queryKey: "getProductDataByFactory",
    filterData: {
      search: searchTerm,
      page: page,
    },
  });

  const handleProductSelect = (product: any) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <>
      <SelectProductComponent
        products={data?.data}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        mode="multiple"
      />{" "}
    </>
  );
};

export default ProductsPage;
