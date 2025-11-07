import {
  ProductStatus,
  ProductType as ProductFormType,
} from "../schema/productSchema";

export const productDefaultValue = (
  defaultValues: Partial<ProductFormType> = {},
): ProductFormType => {
  return {
    factory_id: defaultValues.factory_id ?? "",
    product_type: defaultValues.product_type ?? "",
    name: defaultValues.name ?? "",
    product_code: defaultValues.product_code ?? "",
    category: defaultValues.category ?? "",
    unit_type: defaultValues.unit_type!,
    purchase_price: defaultValues.purchase_price!,
    selling_price: defaultValues.selling_price!,
    current_stock: defaultValues.current_stock!,
    min_stock_level: defaultValues.min_stock_level!,
    description: defaultValues.description ?? "",
    image_url: defaultValues.image_url ?? "",
    status: defaultValues.status ?? ProductStatus.ACTIVE,
    created_by: defaultValues.created_by ?? "",
  };
};
