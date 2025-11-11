import {
  ProductStatus,
  ProductType as ProductFormType,
} from "../schema/productSchema";

export const productDefaultValue = (
  defaultValues: Partial<ProductFormType> = {},
): ProductFormType => {
  return {
    factoryId: defaultValues.factoryId ?? "",
    name: defaultValues.name ?? "",
    sku: defaultValues.sku ?? "",
    unit: defaultValues.unit ?? "",
    size: defaultValues.size ?? "",
    category: defaultValues.category ?? "",
    buyPrice: defaultValues.buyPrice ?? 0,
    sellPrice: defaultValues.sellPrice ?? 0,
    stock: defaultValues.stock ?? 0,
    note: defaultValues.note ?? "",
    // product_type: defaultValues.product_type ?? "",
    // name: defaultValues.name ?? "",
    // product_code: defaultValues.product_code ?? "",
    // category: defaultValues.category ?? "",
    // unit_type: defaultValues.unit_type!,
    // purchase_price: defaultValues.purchase_price!,
    // selling_price: defaultValues.selling_price!,
    // current_stock: defaultValues.current_stock!,
    // min_stock_level: defaultValues.min_stock_level!,
    // description: defaultValues.description ?? "",
    // image_url: defaultValues.image_url ?? "",
    // status: defaultValues.status ?? ProductStatus.ACTIVE,
    // created_by: defaultValues.created_by ?? "",
  };
};
//   name: z.string().min(1, 'Name is required'),
//   sku: z.string().optional(),
//   unit: z.string().optional(),
//   size: z.string().optional(),
//   category: z.string().optional(),
//   buyPrice: z.number().optional().default(0),
//   sellPrice: z.number().optional().default(0),
//   stock: z.number().optional().default(0),
//   note: z.string().optional().nullable(),
//   factoryId: z.string().uuid('Invalid factory ID'),
// })
