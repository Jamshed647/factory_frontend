"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { Edit2Icon, MinusIcon } from "lucide-react";
import React, { useState } from "react";
import ProductSelectorGrid from "../productSelectorComponent";
import { Product, SelectedProduct } from "../schema/product-type";
import CreateProductionModal from "../create/createProduction";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import DataLoader from "@/components/common/GlobalLoader/dataLoader";

interface ProductionModalProps {
  factoryId: string;
  productData?: any;
}

const ProductionUpdateModal = ({
  factoryId,
  productData,
}: ProductionModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [seeMore, setSeeMore] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([
    ...productData,
  ]);

  console.log("selectedProducts", selectedProducts);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/product/factory/${factoryId}`,
    queryKey: "getProductDataByFactory",
    filterData: { type: "RAW", search: searchTerm, page },
  });

  console.log("data", data?.data);

  const updateLimit = (product: Product | SelectedProduct, limit: number) => {
    setSelectedProducts((prev) => {
      // --- Type narrowing ---
      const productId = "id" in product ? product.id : product.productId;
      const name = data?.data?.find((p: Product) => p.id === productId);
      console.log("product", name);
      const quantity = data?.data?.find(
        (p: Product) => p.id === productId,
      )?.quantity;

      const quantityType =
        "quantityType" in product ? product.quantityType : "";
      const buyPrice = Number(product.buyPrice);

      if (!productId) {
        console.error("❌ productId is missing!", product);
        return prev;
      }

      // Validate limit against stock
      if (limit < 0 || limit > quantity) return prev;

      const exists = prev.find((p) => p.productId === productId);

      // --- UPDATE Case ---
      if (exists) {
        // Remove if limit is zero
        if (limit === 0) {
          return prev.filter((p) => p.productId !== productId);
        }

        // Update existing
        return prev.map((p) =>
          p.productId === productId
            ? { ...p, limit, totalPrice: buyPrice * limit }
            : p,
        );
      }

      // --- ADD Case ---
      if (limit > 0) {
        return [
          ...prev,
          {
            productId,
            name,
            quantity,
            quantityType,
            limit,
            buyPrice,
            totalPrice: buyPrice * limit,
          },
        ];
      }

      return prev;
    });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="py-0 px-2 rounded-md border"
          icon={<Edit2Icon className="w-5 h-5" />}
          tooltipContent="Update Production"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Add To Production"
      style="!w-[70vw]"
    >
      <div>
        <div>
          <CreateProductionModal
            product={productData}
            setOpen={setOpen}
            setSelectedProducts={setSelectedProducts}
          />
        </div>

        <div>
          {productData.length < 1 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No products selected
              </p>
            </div>
          ) : (
            <div>
              <h2 className="p-2 my-4 text-lg font-semibold text-center bg-green-100 rounded-md">
                Selected Production
              </h2>

              <ProductSelectorGrid
                products={productData}
                selectedProducts={selectedProducts}
                updateLimit={updateLimit}
              />
            </div>
          )}
        </div>

        <div>
          {seeMore ? (
            <div className="flex justify-center mt-4">
              <ActionButton
                type="button"
                variant="outline"
                buttonContent="See More"
                handleOpen={() => setSeeMore(false)}
              />
            </div>
          ) : (
            <div className="mt-4">
              <div className="relative">
                <h2 className="p-2 my-3 text-lg font-semibold text-center bg-blue-100 rounded-md">
                  Select Production
                </h2>

                <MinusIcon
                  className="absolute top-1.5 right-2 py-0 px-2 text-red-600 bg-white rounded-full cursor-pointer hover:text-red-800"
                  size={28}
                  strokeWidth={2}
                  onClick={() => setSeeMore(true)}
                />
              </div>

              <div className="flex justify-between mb-4">
                <CustomField.CommonSearch
                  placeholder="Search product"
                  width="w-full"
                  searchText={searchTerm}
                  setSearchText={setSearchTerm}
                />
              </div>

              {isLoading ? (
                <DataLoader />
              ) : data?.data.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-lg text-muted-foreground">
                    No products found
                  </p>
                </div>
              ) : (
                <ProductSelectorGrid
                  products={data?.data}
                  selectedProducts={selectedProducts}
                  updateLimit={updateLimit}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
};

export default ProductionUpdateModal;
