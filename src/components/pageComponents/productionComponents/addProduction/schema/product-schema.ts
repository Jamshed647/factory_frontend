import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

export const productionSchema = z.object({
  factoryId: z.string(),
  name: validationSchemas.textSchema({ label: "Production Name" }),
  totalProductionAmount: validationSchemas.numberSchema({
    label: "Total Production Amount",
    type: "number",
  }),
  extraCost: validationSchemas.numberSchema({
    label: "Extra Cost",
    type: "number",
  }),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  note: z.string().optional(),

  items: z
    .array(
      z.object({
        productId: validationSchemas.textSchema({ label: "Product" }),
        quantity: validationSchemas.numberSchema({ label: "Quantity" }),
        buyPrice: validationSchemas.numberSchema({ label: "Buy Price" }),
        totalPrice: validationSchemas.numberSchema({ label: "Total Price" }),
      }),
    )
    .min(1, "At least 1 item is required"),
});

export type ProductionFormType = z.infer<typeof productionSchema>;
