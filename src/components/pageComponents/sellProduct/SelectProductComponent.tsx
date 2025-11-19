/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon } from "lucide-react";
import ActionButton from "@/components/common/button/actionButton";
import { CookieCart } from "@/utils/cookie/cart-utils";
import { useState } from "react";
import ProductModal from "./productModal";

interface Item {
  id: string;
  limit: number;
  name: string;
  sellPrice: number;
  updateSellPrice?: number;
  stock: number;
}

interface SelectProductComponentProps {
  products: any[];
  selectedProducts: Item[];
  setSelectedProducts: (items: Item[]) => void;
  mode?: "single" | "multiple";
  isClickable?: boolean;
}

export const SelectProductComponent = ({
  products = [],
  selectedProducts = [],
  setSelectedProducts,
  mode = "single",
  isClickable = false,
}: SelectProductComponentProps) => {
  const cart = CookieCart("selected_products");
  const [open, setOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<Item>();

  const isSelected = (id: string) =>
    selectedProducts.some((item) => item.id === id);

  const getLimit = (id: string) =>
    selectedProducts.find((item) => item.id === id)?.limit || 0;

  const updateLimit = (
    id: string,
    limit: number,
    name: string,
    sellPrice: number,
    stock: number,
    updateSellPrice?: number,
  ) => {
    const updated = cart.update(
      id,
      limit,
      name,
      sellPrice,
      stock,
      updateSellPrice as number,
    );
    setSelectedProducts(updated);
  };

  return (
    <div className="py-4 space-y-6">
      {mode === "multiple" && selectedProducts.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="px-4">
            <p className="mb-3 text-sm font-semibold text-blue-900">
              {selectedProducts.length} item
              {selectedProducts.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((p) => (
                <Badge key={p.id} variant="secondary" className="text-xs">
                  {p.name} (limit: {p.limit})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => {
            const selected = isSelected(p?.id);
            const limit = getLimit(p?.id);
            const isStock = (p?.quantity ?? p?.stock) > 0;

            const total =
              p?.updateSellPrice != null && p.updateSellPrice !== ""
                ? Number(p.updateSellPrice) * limit
                : Number(p?.sellPrice) * limit;

            return (
              <Card
                onClick={
                  isClickable
                    ? () => {
                        setOpen(true);
                        setUpdateProduct(p);
                      }
                    : undefined
                }
                key={p?.id}
                className={`transition-all  duration-200 ${isClickable ? "cursor-pointer" : ""} hover:shadow-lg ${
                  selected ? " bg-blue-100 shadow-md" : ""
                }`}
              >
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold truncate">
                      {p?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {p?.category}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="font-medium">
                        {p?.quantity ?? p?.stock} {p?.quantityType}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <div className="font-semibold text-emerald-600">
                        {p?.updateSellPrice &&
                          p?.updateSellPrice != p?.sellPrice && (
                            <span className="mr-1 line-through text-muted-foreground">
                              ৳{p?.sellPrice}
                            </span>
                          )}
                        <span>৳{p?.updateSellPrice ?? p?.sellPrice}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-emerald-50 rounded-md">
                      <div className="flex gap-2 items-baseline">
                        <span className="text-sm font-medium text-emerald-800">
                          Total
                        </span>
                        <span className="text-xs text-emerald-600">
                          (৳{p?.updateSellPrice ?? p?.sellPrice} × {limit})
                        </span>
                      </div>
                      <span className="font-semibold text-emerald-700">
                        ৳{total}
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
                        updateLimit(
                          p.id,
                          limit - 1,
                          p?.name,
                          p?.sellPrice,
                          p?.quantity ?? p?.stock,
                          p?.updateSellPrice,
                        );
                        e.stopPropagation();
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
                        updateLimit(
                          p.id,
                          limit + 1,
                          p?.name,
                          p?.sellPrice,
                          p?.quantity ?? p?.stock,
                          p?.updateSellPrice,
                        );
                        e.stopPropagation();
                      }}
                      btnStyle="bg-green-500 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <ProductModal
        open={open}
        updateLimit={updateLimit}
        setOpen={setOpen}
        productData={updateProduct}
      />
    </div>
  );
};
