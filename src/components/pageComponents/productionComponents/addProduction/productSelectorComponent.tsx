/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import ActionButton from "@/components/common/button/actionButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Product, SelectedProduct } from "./schema/product-type";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";

interface Props {
  products: Product[];
  selectedProducts: SelectedProduct[];
  updateLimit: (product: Product, limit: number, stock?: number) => void;
}

const ProductSelectorGrid = ({
  products,
  selectedProducts,
  updateLimit,
}: Props) => {
  const isSelected = (id: string) =>
    selectedProducts.some((item) => item?.productId === id);

  const getProductionQuantity = (id: string) =>
    selectedProducts.find((item) => item?.productId === id);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((p: Product) => {
        const { data } = DataFetcher.fetchProductById({
          id: p?.productId ?? p?.id,
        });
        const product = data?.data;

        const selected = isSelected(p.id ?? p.productId);

        const matchedProduct = getProductionQuantity(p?.productId ?? p?.id);

        const productionQuantity =
          matchedProduct?.productionQuantity ?? p?.productionQuantity ?? 0;

        const stock = p?.quantity ?? product?.quantity;

        const unit = p?.quantityType ?? product?.quantityType;
        const productName = p?.name ?? product?.name;
        const category = p?.category ?? product?.category;
        const buyPrice = p?.buyPrice ?? product?.buyPrice;

        const isStock = stock > 0;

        return (
          <Card
            key={`${p?.id}-${p?.name}`}
            className={`transition-all duration-200 cursor-pointer hover:shadow-lg ${
              selected ? "bg-blue-100 shadow-md" : ""
            }`}
          >
            <CardContent className="space-y-3">
              <div>
                <h3 className="text-base font-semibold truncate">
                  {productName}
                </h3>
                <p className="text-sm text-muted-foreground">{category}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">
                    {stock} {unit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Price:</span>

                  <span className="font-semibold text-emerald-600">
                    ৳{buyPrice}
                  </span>
                </div>

                <div className="flex justify-between items-center p-2 bg-emerald-50 rounded-md">
                  <span>
                    Total (৳{buyPrice} × {productionQuantity})
                  </span>
                  <span className="font-semibold">
                    ৳{buyPrice * productionQuantity}
                  </span>
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
                    updateLimit(p, productionQuantity - 1, stock);
                  }}
                  btnStyle="bg-red-500 text-white"
                />

                <span className="px-2 font-semibold">{productionQuantity}</span>

                <ActionButton
                  type="button"
                  disabled={!isStock}
                  icon={<PlusIcon className="w-5 h-5" />}
                  tooltipContent="Increase"
                  handleOpen={(e: any) => {
                    e.stopPropagation();
                    updateLimit(product, productionQuantity + 1, stock);
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
