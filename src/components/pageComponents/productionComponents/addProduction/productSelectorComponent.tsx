"use client";

import ProductCard from "./ProductCard";
import type { Product, SelectedProduct } from "./schema/product-type";

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
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product: Product, i: number) => (
        <ProductCard
          key={`${i}-${product?.name}`}
          product={product}
          selectedProducts={selectedProducts}
          updateLimit={updateLimit}
        />
      ))}
    </div>
  );
};

export default ProductSelectorGrid;
