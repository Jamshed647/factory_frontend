"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { Edit2Icon, MinusIcon } from "lucide-react";
import React from "react";
import ProductSelectorGrid from "./productSelectorComponent";
import { Product, SelectedProduct } from "./schema/product-type";
import CreateProductionModal from "./create/createProduction";
import { CustomField } from "@/components/common/fields/cusField";

interface ProductionModalProps {
  allProducts?: any;
  productData?: any;
  selectedProducts: SelectedProduct[];
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  updateLimit: (product: Product, limit: number) => void;
  setSelectedProducts: (items: SelectedProduct[]) => void;
}

const ProductionModal = ({
  setSearchTerm,
  searchTerm,
  allProducts,
  productData,
  selectedProducts,
  updateLimit,
  setSelectedProducts,
}: ProductionModalProps) => {
  const [seeMore, setSeeMore] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Add Production"
          disabled={selectedProducts.length === 0}
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

              <ProductSelectorGrid
                products={allProducts}
                selectedProducts={selectedProducts}
                updateLimit={updateLimit}
              />
            </div>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
};

export default ProductionModal;
