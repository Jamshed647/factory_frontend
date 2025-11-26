"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { Edit2Icon } from "lucide-react";
import React from "react";
import ProductSelectorGrid from "./productSelectorComponent";
import { Product, SelectedProduct } from "./schema/product-type";
import CreateProductionModal from "./create/createProduction";

interface ProductionModalProps {
  productData?: any;
  selectedProducts: SelectedProduct[];
  updateLimit: (product: Product, limit: number) => void;
  setSelectedProducts: (items: SelectedProduct[]) => void;
}

const ProductionModal = ({
  productData,
  selectedProducts,
  updateLimit,
  setSelectedProducts,
}: ProductionModalProps) => {
  console.log("data", productData);
  const [open, setOpen] = React.useState(false);

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Add Production"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Add Production"
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

        <h2 className="my-3">Select Production</h2>

        <div>
          <ProductSelectorGrid
            products={productData}
            selectedProducts={selectedProducts}
            updateLimit={updateLimit}
          />
        </div>
      </div>
    </DialogWrapper>
  );
};

export default ProductionModal;
