import {
  ProductStatus,
  ProductType as ProductFormType,
} from "../schema/productSchema";
// export const createProductSchema = z.object({
//   name: validationSchemas.nameSchema({ label: "Product Name" }),
//   productType: z.string().optional().nullable(),
//   category: z.string().min(1, "Category is required"),
//   quantity: z.string().min(1, "Quantity is required"),
//   quantityType: z.string().min(1, "Quantity type is required"),
//   buyPrice: z.number().min(0).default(0),
//   sellPrice: z.number().min(0).default(0),
//   note: z.string().optional().nullable(),
//   status: z.enum(["ACTIVE", "INACTIVE"]).optional().default("ACTIVE"),
//   factoryId: z.string().uuid("Invalid factory ID"),
// });

export const productDefaultValue = (
  V: Partial<ProductFormType> = {},
): ProductFormType => {
  return {
    name: V.name || "",
    productType: V.productType || "",
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
