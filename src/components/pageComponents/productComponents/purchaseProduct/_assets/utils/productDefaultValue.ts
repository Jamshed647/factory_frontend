import {
  ProductStatus,
  ProductType as ProductFormType,
} from "../schema/productSchema";

export const productDefaultValue = (
  V: Partial<ProductFormType> = {},
): ProductFormType => {
  return {
    name: V.name || "",
    productType: "RAW",
    category: V.category || "",
    quantity: V.quantity!,
    quantityType: V.quantityType || "",
    buyPrice: V.buyPrice!,
    sellPrice: V.sellPrice!,
    note: V.note || "",
    status: V.status || ProductStatus.ACTIVE,
    factoryId: V.factoryId || "",
  };
};
