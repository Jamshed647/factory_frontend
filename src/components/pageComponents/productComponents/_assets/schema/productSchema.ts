import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

export enum UnitType {
  KG = "kg",
  PCS = "pcs",
  BAG = "bag",
  METER = "meter",
  LITER = "liter",
  ROLL = "roll",
}

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const createProductSchema = z.object({
  factory_id: validationSchemas.textSchema({ label: "Factory id" }),
  product_type: validationSchemas.textSchema({ label: "Product Type" }),
  name: z.string().min(1, "Product name is required"),
  product_code: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  unit_type: z.nativeEnum(UnitType),
  purchase_price: validationSchemas.numberSchema({ label: "Purchase Price" }),
  selling_price: validationSchemas.numberSchema({ label: "Selling Price" }),
  current_stock: validationSchemas.numberSchema({ label: "Current Stock" }),
  min_stock_level: validationSchemas.numberSchema({ label: "Min Stock Level" }),
  description: z.string().optional(),
  image_url: validationSchemas.urlSchema({
    label: "Image URL",
    required: false,
  }),
  status: validationSchemas.textSchema({ label: "Status" }),
  created_by: z.string().uuid({ message: "Invalid creator ID" }),
});

export const updateProductSchema = createProductSchema
  // .omit({
  //   pinCode: true,
  //   confirmPinCode: true,
  // })
  .partial();

// --- TypeScript types inferred from schemas ---
export type ProductType = z.infer<typeof createProductSchema>;

export type UpdateProductType = z.infer<typeof updateProductSchema>;
