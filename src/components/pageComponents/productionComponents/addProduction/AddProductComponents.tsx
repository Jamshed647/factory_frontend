/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import { useAuth } from "@/hooks/hooks";
import { useState } from "react";
import ProductionModal from "./ProductionModal";
import ProductSelectorGrid from "./productSelectorComponent";
import { Product, SelectedProduct } from "./schema/product-type";

const AddProductionComponents = () => {
  const { user } = useAuth();
  const factoryId = user?.factoryId ?? "";

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  // const isSelected = (id: string) =>
  //   selectedProducts.some((item) => item.productId === id);
  //
  // const getLimit = (id: string) =>
  //   selectedProducts.find((item) => item.productId === id)?.limit ?? 0;

  const updateLimit = (product: Product, limit: number) => {
    setSelectedProducts((prev) => {
      if (limit < 0 || limit > product.quantity) return prev;

      const exists = prev.find((p) => p.productId === product.id);

      if (exists) {
        // Update both limit and totalPrice
        return prev.map((p) =>
          p.productId === product.id
            ? {
                ...p,
                limit,
                totalPrice: Number(product.buyPrice) * Number(limit),
              }
            : p,
        );
      }

      // Add new product if not exists
      return [
        ...prev,
        {
          name: product?.name,
          quantity: Number(product.quantity),
          quantityType: product?.quantityType,
          productId: product?.id,
          limit,
          buyPrice: Number(product?.buyPrice),
          totalPrice: Number(product?.buyPrice) * Number(limit),
        },
      ];
    });
  };

  const { data } = useFetchData({
    method: "GET",
    path: `factory/product/factory/${factoryId}`,
    queryKey: "getProductDataByFactory",
    filterData: { type: "RAW", search: searchTerm, page },
  });

  const products: Product[] = (data?.data || []).map((p: any) => ({
    ...p,
    quantity: Number(p.quantity),
  }));

  return (
    <div>
      <div className="flex justify-between mb-4">
        <CustomField.CommonSearch
          placeholder="Search product"
          width="w-full"
          searchText={searchTerm}
          setSearchText={setSearchTerm}
        />

        <ProductionModal
          productData={selectedProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          updateLimit={updateLimit}
        />
      </div>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      ) : (
        <ProductSelectorGrid
          products={products}
          selectedProducts={selectedProducts}
          updateLimit={updateLimit}
        />
      )}
    </div>
  );
};

export default AddProductionComponents;
