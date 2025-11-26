import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

export const productionSchema = z.object({
  factoryId: z.string(),
  name: z.string().min(1, "Name is required"),
  totalProductionAmount: z.number().nonnegative(),
  extraCost: z.number().nonnegative(),
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
