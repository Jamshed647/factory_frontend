/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import ActionButton from "@/components/common/button/actionButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Product, SelectedProduct } from "./schema/product-type";

interface Props {
  products: Product[];
  selectedProducts: SelectedProduct[];
  updateLimit: (product: Product, limit: number) => void;
}

const ProductSelectorGrid = ({
  products,
  selectedProducts,
  updateLimit,
}: Props) => {
  const isSelected = (id: string) =>
    selectedProducts.some((item) => item?.productId === id);

  const getLimit = (id: string) =>
    selectedProducts?.find((item) => item?.productId === id)?.limit ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((p: Product) => {
        const selected = isSelected(p.id);
        const limit = getLimit(p.id ?? p.productId);

        const isStock = p.quantity > 0;

        return (
          <Card
            key={`${p?.id}-${p?.name}`}
            className={`transition-all duration-200 cursor-pointer hover:shadow-lg ${
              selected ? "bg-blue-100 shadow-md" : ""
            }`}
          >
            <CardContent className="space-y-3">
              <div>
                <h3 className="text-base font-semibold truncate">{p?.name}</h3>
                <p className="text-sm text-muted-foreground">{p?.category}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">
                    {p?.quantity} {p?.quantityType}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="font-semibold text-emerald-600">
                    ৳{p.buyPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-emerald-50 rounded-md">
                  <span>
                    Total (৳{p?.buyPrice} × {limit})
                  </span>
                  <span className="font-semibold">৳{p.buyPrice * limit}</span>
                </div>
              </div>

              <div className="flex justify-between mt-2">
                <ActionButton
                  type="button"
                  disabled={!isStock}
                  icon={<MinusIcon className="w-5 h-5" />}
                  tooltipContent="Decrease"
                  handleOpen={(e: any) => {
                    e.stopPropagation();
                    updateLimit(p, limit - 1);
                  }}
                  btnStyle="bg-red-500 text-white"
                />

                <span className="px-2 font-semibold">{limit}</span>

                <ActionButton
                  type="button"
                  disabled={!isStock}
                  icon={<PlusIcon className="w-5 h-5" />}
                  tooltipContent="Increase"
                  handleOpen={(e: any) => {
                    e.stopPropagation();
                    updateLimit(p, limit + 1);
                  }}
                  btnStyle="bg-green-500 text-white"
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductSelectorGrid;
