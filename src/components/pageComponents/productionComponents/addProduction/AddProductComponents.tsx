/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import { useState } from "react";
import ProductionModal from "./ProductionModal";
import ProductSelectorGrid from "./productSelectorComponent";
import { Product, SelectedProduct } from "./schema/product-type";
import DataLoader from "@/components/common/GlobalLoader/dataLoader";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useFactory } from "@/utils/factoryInfo";

const AddProductionComponents = () => {
  const { factory } = useFactory();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/product/factory/${factory?.id}`,
    queryKey: "getProductDataByFactory",
    filterData: { type: "RAW", search: searchTerm, page },
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );

  const updateLimit = (
    product: Product | SelectedProduct,
    productionQuantity: number,
  ) => {
    setSelectedProducts((prev) => {
      // --- Type narrowing ---
      const productId = "id" in product ? product.id : product.productId;
      const name = product?.name;
      const quantity = product?.quantity ?? 0;

      const quantityType =
        "quantityType" in product ? product.quantityType : "";
      const buyPrice = Number(product.buyPrice);

      if (!productId) {
        console.error("❌ productId is missing!", product);
        return prev;
      }

      // Validate limit against stock
      //      if (productionQuantity < 0 || productionQuantity > quantity) return prev;
      // Validate productionQuantity
      if (productionQuantity < 0 || productionQuantity > quantity) {
        showToast("error", "Production quantity is invalid");
        return prev;
      }

      const exists = prev.find((p) => p.productId === productId);

      // console.log({
      //   productId: productId,
      //   name: name,
      //   quantity: quantity,
      //   quantityType: quantityType,
      //   productionQuantity: productionQuantity,
      //   buyPrice: buyPrice,
      //   exists: exists,
      // });

      // --- UPDATE Case ---
      if (exists) {
        // Remove if limit is zero
        if (productionQuantity === 0) {
          return prev.filter((p) => p.productId !== productId);
        }

        // Update existing
        return prev.map((p) =>
          p.productId === productId
            ? {
                ...p,
                productionQuantity,
                totalPrice: buyPrice * productionQuantity,
              }
            : p,
        );
      }

      // --- ADD Case ---
      if (productionQuantity > 0) {
        return [
          ...prev,
          {
            productId,
            name,
            quantity,
            quantityType,
            productionQuantity,
            buyPrice,
            totalPrice: buyPrice * productionQuantity,
          },
        ];
      }

      return prev;
    });
  };

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
          allProducts={data?.data}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          productData={selectedProducts}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          updateLimit={updateLimit}
        />
      </div>

      {isLoading ? (
        <DataLoader />
      ) : products.length === 0 ? (
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
