import { validationSchemas } from "@/types/SchemaType/validationSchema";
import { z } from "zod";

export const productionSchema = z
  .object({
    factoryId: validationSchemas.textSchema({ label: "Factory Id" }),
    productionId: validationSchemas.textSchema({ label: "Production Id" }),
    totalWeight: validationSchemas.numberSchema({
      label: "Total Weight",
      type: "number",
    }),
    packagingType: validationSchemas.numberSchema({
      label: "Packaging Type",
      type: "number",
    }),

    items: z
      .array(
        z.object({
          name: validationSchemas.textSchema({ label: "Product Name" }),
          size: validationSchemas.numberSchema({
            label: "Size",
            type: "number",
          }),
          sellPrice: validationSchemas.numberSchema({
            label: "Sell Price",
            type: "number",
          }),
          quantity: validationSchemas.numberSchema({
            label: "Quantity",
            type: "number",
          }),
        }),
      )
      .min(1, "At least 1 item is required"),
  })
  // packagingType condition
  .refine((data) => data.packagingType === data.items.length, {
    message: "Packaging type must equal the number of items",
    path: ["packagingType"],
  })
  // totalWeight condition
  .refine(
    (data) => {
      const total = data.items.reduce(
        (sum, item) => sum + item.size * item.quantity,
        0,
      );
      return data.totalWeight === total;
    },
    {
      message:
        "Total weight must match the calculated sum of size × quantity for all items.",
      path: ["totalWeight"],
    },
  );

export type ProductionFormType = z.infer<typeof productionSchema>;
