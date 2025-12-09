/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { Edit2Icon, MinusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductSelectorGrid from "../productSelectorComponent";
import type { Product, SelectedProduct } from "../schema/product-type";
import useFetchData from "@/app/utils/TanstackQueries/useFetchData";
import { CustomField } from "@/components/common/fields/cusField";
import DataLoader from "@/components/common/GlobalLoader/dataLoader";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  type ProductionFormType,
  productionSchema,
} from "../schema/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { productionDefaultValue } from "../schema/productDefaultValue";
import CreateProductionForm from "../form/createProductionForm";

interface ProductionModalProps {
  factoryId: string;
  productData?: any;
}

const ProductionUpdateModal = ({
  factoryId,
  productData,
}: ProductionModalProps) => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [seeMore, setSeeMore] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([
    ...productData?.items,
  ]);

  //  console.log("🚀 ProductionModal", selectedProducts);

  const { data, isLoading } = useFetchData({
    method: "GET",
    path: `factory/product/factory/${factoryId}`,
    queryKey: "getProductDataByFactoryForAdd",
    filterData: { type: "RAW", search: searchTerm, page },
  });

  const form = useForm<ProductionFormType>({
    resolver: zodResolver(productionSchema),
    defaultValues: productionDefaultValue(productData),
  });

  const updateLimit = (
    product: Product | SelectedProduct,
    productionQuantity: number,
    stock?: number,
  ) => {
    setSelectedProducts((prev) => {
      const productId = "productId" in product ? product.productId : product.id;
      if (!productId) return prev;

      const name = product.name ?? "";
      const quantity = stock ?? Number(product.quantity ?? 0);
      const buyPrice = Number(product.buyPrice ?? 0);

      if (productionQuantity < 0 || productionQuantity > quantity) {
        showToast("error", "Production quantity is invalid");
        return prev;
      }

      const existsIndex = prev.findIndex((p) => p.productId === productId);

      // Check if product exists FIRST
      if (existsIndex !== -1) {
        // UPDATE existing product
        if (productionQuantity === 0) {
          return prev.filter((p) => p.productId !== productId);
        }
        const updated = [...prev];
        updated[existsIndex] = {
          ...updated[existsIndex],
          productionQuantity,
          totalPrice: buyPrice * productionQuantity,
        };
        return updated;
      }

      // Only add if it doesn't exist AND quantity > 0
      if (productionQuantity > 0) {
        return [
          ...prev,
          {
            productId,
            name,
            quantity,
            productionQuantity,
            buyPrice,
            totalPrice: buyPrice * productionQuantity,
          },
        ];
      }

      return prev;
    });
  };

  const addProduct = useApiMutation({
    path: `factory/production/${productData?.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({
        queryKey: ["getProductionDataByFactory"],
      });
      form.reset({});
      setOpen(false);
      // setSelectedProducts([]);
    },
  });

  const totalProductionPrice = selectedProducts.reduce(
    (sum, product) => sum + (product.totalPrice || 0),
    0,
  );

  useEffect(() => {
    if (selectedProducts.length > 0) {
      form.setValue("items", selectedProducts as any);
    }
    if (totalProductionPrice) {
      form.setValue("totalProductionAmount", totalProductionPrice);
    }
  }, [selectedProducts, form, totalProductionPrice]);

  const onSubmit = (data: ProductionFormType) => {
    const { factoryId, ...rest } = data;
    addProduct.mutate(rest);
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
      title="Update Production"
      style="!w-[70vw]"
    >
      <div>
        <div>
          <CreateProductionForm
            form={form}
            onSubmit={onSubmit}
            isPending={addProduct.isPending}
          />
        </div>

        <div>
          {selectedProducts.length < 1 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No products selected
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center p-2 my-4 bg-green-100 rounded-md">
                <h2 className="text-lg font-semibold">
                  Selected Production ({selectedProducts.length})
                </h2>
                <span className="text-lg font-semibold">
                  Total: ৳{totalProductionPrice.toFixed(2)}
                </span>
              </div>

              <ProductSelectorGrid
                products={selectedProducts}
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
