import {
  ProductStatus,
  ProductType as ProductFormType,
} from "../schema/productSchema";

// export const productDefaultValue = (
//   V: Partial<ProductFormType> = {},
// ): ProductFormType => {
//   return {
//     name: V.name || "",
//     productType: "FINISHED",
//     category: V.category || "",
//     quantity: V.quantity!,
//     quantityType: V.quantityType || "",
//     buyPrice: V.buyPrice!,
//     sellPrice: V.sellPrice!,
//     note: V.note || "",
//     status: V.status || ProductStatus.ACTIVE,
//     factoryId: V.factoryId || "",
//   };
// };

export const productDefaultValue = (
  V: Partial<ProductFormType> = {},
): ProductFormType => {
  return {
    name: V.name ?? "",
    productType: V.productType ?? "FINISHED",
    category: V.category ?? "",
    quantity: V.quantity ?? 0,
    quantityType: V.quantityType ?? "",
    buyPrice: V.buyPrice ?? 0,
    sellPrice: V.sellPrice ?? 0,
    note: V.note ?? "",
    status: V.status ?? ProductStatus.ACTIVE,
    factoryId: V.factoryId ?? "",
  };
};
