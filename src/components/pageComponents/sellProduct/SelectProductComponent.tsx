/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Plus, Check } from "lucide-react";

interface SelectProductComponentProps {
  products: any;
  onProductSelect?: (product: any) => void;
  selectedProducts?: any;
  mode?: "single" | "multiple";
}

export const SelectProductComponent = ({
  products = [],
  onProductSelect,
  selectedProducts = [],
  mode = "single",
}: SelectProductComponentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const isSelected = (id: string) =>
    selectedProducts.some((item: any) => item?.id === id);

  const filtered = useMemo(() => {
    return products.filter((p: any) =>
      `${p.name} ${p.category}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Select Products</h1>
        {mode === "multiple" && selectedProducts.length > 0 && (
          <Badge className="text-white bg-blue-600">
            {selectedProducts.length} selected
          </Badge>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p: any) => {
            const selected = isSelected(p.id);
            return (
              <Card
                key={p.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selected
                    ? "ring-2 ring-blue-500 shadow-md"
                    : "hover:border-blue-300"
                }`}
                onClick={() => onProductSelect?.(p)}
              >
                <CardContent className="p-4 space-y-3">
                  {/* Product Name */}
                  <div>
                    <h3 className="text-base font-semibold truncate">
                      {p.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {p.category}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock:</span>
                      <span className="font-medium">
                        {p.quantity} {p.quantityType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold text-emerald-600">
                        ৳{p.sellPrice}
                      </span>
                    </div>
                  </div>

                  {/* Select Button */}
                  <Button
                    size="sm"
                    className={`w-full mt-2 transition-colors ${
                      selected
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-200 hover:bg-gray-300 text-foreground"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductSelect?.(p);
                    }}
                  >
                    {selected ? (
                      <>
                        <Check className="mr-2 w-4 h-4" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 w-4 h-4" />
                        Select
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Summary */}
      {mode === "multiple" && selectedProducts.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="mb-3 text-sm font-semibold text-blue-900">
              {selectedProducts.length} item
              {selectedProducts.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((p: any) => (
                <Badge key={p?.id} variant="secondary" className="text-xs">
                  {p.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
