/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import ActionButton from "@/components/common/button/actionButton";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { Product, SelectedProduct } from "./schema/product-type";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";

interface ProductCardProps {
  product: Product;
  selectedProducts: SelectedProduct[];
  updateLimit: (product: Product, limit: number, stock?: number) => void;
}

const ProductCard = ({
  product,
  selectedProducts,
  updateLimit,
}: ProductCardProps) => {
  const { data } = DataFetcher.fetchProductById({
    id: product?.productId ?? product?.id,
  });
  const fetchedProduct = data?.data;

  const isSelected = selectedProducts.some(
    (item) => item?.productId === (product.id ?? product.productId),
  );

  const matchedProduct = selectedProducts.find(
    (item) => item?.productId === (product?.productId ?? product?.id),
  );

  const productionQuantity =
    matchedProduct?.productionQuantity ?? product?.productionQuantity ?? 0;

  const stock = product?.quantity ?? fetchedProduct?.quantity;
  const unit = product?.quantityType ?? fetchedProduct?.quantityType;
  const productName = product?.name ?? fetchedProduct?.name;
  const category = product?.category ?? fetchedProduct?.category;
  const buyPrice = product?.buyPrice ?? fetchedProduct?.buyPrice;

  const isStock = stock > 0;

  return (
    <Card
      key={`${product?.id}-${product?.name}`}
      className={`transition-all duration-200 cursor-pointer hover:shadow-lg ${
        isSelected ? "bg-blue-100 shadow-md" : ""
      }`}
    >
      <CardContent className="space-y-3">
        <div>
          <h3 className="text-base font-semibold truncate">{productName}</h3>
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
            <span className="font-semibold text-emerald-600">৳{buyPrice}</span>
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
              updateLimit(product, productionQuantity - 1, stock);
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
};

export default ProductCard;
