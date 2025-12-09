/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useProductDetails.ts
import { useMemo } from "react";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";

export const useProductDetails = (products: any[]) => {
  const productDetails = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return {};
    }

    const details: Record<string, any> = {};

    // Assuming DataFetcher.fetchProductById returns data synchronously
    // If it's async, you'll need to handle it differently
    products.forEach((p) => {
      const productId = p?.productId ?? p?.id;
      if (productId) {
        try {
          const { data } = DataFetcher.fetchProductById({
            id: productId,
          });
          details[productId] = data?.data;
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          details[productId] = null;
        }
      }
    });

    return details;
  }, [products]);

  return productDetails;
};
