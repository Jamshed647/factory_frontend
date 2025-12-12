/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MinusIcon, PlusIcon } from "lucide-react";
import ActionButton from "@/components/common/button/actionButton";
import { useState } from "react";
import ProductModal from "./productModal";
import { CookieCart } from "@/utils/cookie/purchase-cart";
import { Input } from "@/components/ui/input";

interface Item {
  id: string;
  limit: number;
  name: string;
  buyPrice: number;
  updateBuyPrice?: number;
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
  const cart = CookieCart("purchase_products");
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
    buyPrice: number,
    stock: number,
    updateBuyPrice?: number,
  ) => {
    const updated = cart.update(
      id,
      limit,
      name,
      buyPrice,
      stock,
      updateBuyPrice,
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => {
            const selected = isSelected(p?.id);
            const limit = getLimit(p?.id);
            const total =
              p?.updateBuyPrice != null && p.updateBuyPrice !== ""
                ? Number(p.updateBuyPrice) * limit
                : Number(p?.buyPrice) * limit;

            return (
              <div
                // onClick={
                //   isClickable
                //     ? () => {
                //         setOpen(true);
                //         setUpdateProduct(p);
                //       }
                //     : undefined
                // }
                key={p.id}
                className="flex flex-col h-full"
              >
                <Card
                  className={`flex flex-col h-full transition-all  duration-200 ${isClickable ? "cursor-pointer" : ""} hover:shadow-lg ${
                    selected ? " bg-blue-100 shadow-md" : ""
                  }`}
                >
                  <CardContent className="flex flex-col flex-grow p-4 space-y-3">
                    {/* Name and Category - Fixed height */}
                    <div className="min-h-[3.5rem]">
                      <h3 className="text-base font-semibold truncate">
                        {p?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {p?.category}
                      </p>
                    </div>

                    {/* Pricing Info - Fixed height */}
                    <div className="flex-grow space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stock:</span>
                        <span className="font-medium">
                          {p?.quantity ?? p?.stock} {p?.quantityType}
                        </span>
                      </div>

                      {/* <div className="flex justify-between"> */}
                      {/*   <span className="text-muted-foreground"> */}
                      {/*     Cost Price: */}
                      {/*   </span> */}
                      {/*   <div className="font-semibold text-emerald-600"> */}
                      {/*     <span>৳{p?.buyPrice}</span> */}
                      {/*   </div> */}
                      {/* </div> */}

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Buy Price:
                        </span>
                        <div className="font-semibold text-emerald-600">
                          {p?.updateBuyPrice &&
                            p?.updateBuyPrice != p?.buyPrice && (
                              <span className="mr-1 line-through text-muted-foreground">
                                ৳{p?.buyPrice}
                              </span>
                            )}
                          <span>৳{p?.updateBuyPrice ?? p?.buyPrice}</span>
                        </div>
                      </div>

                      {/* Total Section - Fixed at bottom */}
                      <div className="flex justify-between items-center p-2 mt-auto bg-emerald-50 rounded-md">
                        <div className="flex gap-2 items-baseline">
                          <span className="text-sm font-medium text-emerald-800">
                            Total
                          </span>
                          <span className="text-xs text-emerald-600">
                            (৳{p?.updateBuyPrice ?? p?.buyPrice} × {limit})
                          </span>
                        </div>
                        <span className="font-semibold text-emerald-700">
                          ৳{total}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls - Fixed position */}
                    <div className="flex gap-2 justify-between pt-2 mt-2 border-t">
                      <ActionButton
                        type="button"
                        //  disabled={!isStock}
                        icon={<MinusIcon className="w-5 h-5" />}
                        tooltipContent="Decrease"
                        handleOpen={(e: any) => {
                          updateLimit(
                            p.id,
                            limit - 1,
                            p?.name,
                            p?.buyPrice,
                            p?.quantity ?? p?.stock,
                            //p?.updateSellPrice,
                          );
                          e.stopPropagation();
                        }}
                        btnStyle="bg-red-500 text-white"
                      />

                      <Input
                        type="number"
                        value={limit}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          updateLimit(
                            p.id,
                            Number(e.target.value),
                            p?.name,
                            p?.quantity ?? p?.stock,
                            p?.sellPrice,
                            p?.buyPrice,
                          )
                        }
                        name="limit"
                        placeholder="Limit"
                        className="appearance-none bg-white text-center [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden w-fit"
                      />

                      <ActionButton
                        type="button"
                        // disabled={!isStock}
                        icon={<PlusIcon className="w-5 h-5" />}
                        tooltipContent="Increase"
                        handleOpen={(e: any) => {
                          updateLimit(
                            p.id,
                            limit + 1,
                            p?.name,
                            p?.buyPrice,
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
              </div>
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
