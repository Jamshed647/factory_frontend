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

    allowFractionalPackaging: z.boolean(),
    isPriviousMuriExiting: z.boolean(),

    overallTotalWeight: z
      .number()
      .min(1, "Overall total weight must be greater than 0")
      .optional(),

    unpackedWeight: z
      .number()
      .min(1, "Unpacked weight must be greater than 0")
      .optional(),

    // NEW FIELDS
    prevProductionId: z.string().uuid().optional(),
    prevMuriWeight: z.number().min(1).optional(),

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
      const total = data.items.reduce((sum, item) => {
        const size = item.size as number;
        const qty = item.quantity as number;
        return sum + size * qty;
      }, 0);
      // return data.totalWeight === total;
      return (
        (data.prevMuriWeight
          ? (data.totalWeight as number) + (data.prevMuriWeight as number)
          : (data.totalWeight as number)) === total
      );
    },
    {
      message:
        "Total weight must match the calculated sum of size × quantity for all items.",
      path: ["totalWeight"],
    },
  )
  // fractional packaging logic
  .superRefine((data, ctx) => {
    if (data.allowFractionalPackaging) {
      const totalWeight = data.totalWeight as number | undefined;
      const unpackedWeight = data.unpackedWeight as number | undefined;
      const overallTotalWeight = data.overallTotalWeight as number | undefined;

      if (!overallTotalWeight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Overall total weight is required",
          path: ["overallTotalWeight"],
        });
      }

      if (!unpackedWeight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Unpacked weight is required",
          path: ["unpackedWeight"],
        });
      }

      // Only check sum if all three are numbers
      if (
        overallTotalWeight !== undefined &&
        unpackedWeight !== undefined &&
        totalWeight !== undefined
      ) {
        if (unpackedWeight + totalWeight !== overallTotalWeight) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "overallTotalWeight must equal unpackedWeight + totalWeight",
            path: ["overallTotalWeight"],
          });
        }
      }
    }
  });

export type ProductionFormType = z.infer<typeof productionSchema>;
