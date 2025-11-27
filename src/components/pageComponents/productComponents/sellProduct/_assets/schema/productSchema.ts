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
  name: validationSchemas.nameSchema({ label: "Product Name" }),

  productType: z.string().optional().nullable(),

  category: z.string().min(1, "Category is required"),

  quantity: validationSchemas.numberSchema({
    type: "string",
    label: "Quantity",
  }),

  quantityType: z.string().min(1, "Quantity type is required"),

  buyPrice: validationSchemas.numberSchema({
    type: "number",
    label: "Buy Price",
  }),

  sellPrice: validationSchemas.numberSchema({
    type: "number",
    label: "Sell Price",
  }),

  note: z.string().optional().nullable(),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),

  factoryId: z.string().uuid("Invalid factory ID"),
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
