import { validationSchemas } from "@/types/SchemaType/validationSchema";
import z from "zod";

const cartSchema = z
  .object({
    supplierId: z.string(),
    factoryId: z.string(),
    paymentMethod: z.enum(["CASH", "BANK"]),
    totalPurchaseAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Total Purchase Amount",
    }),
    totalAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Total Price",
    }),
    paidAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Paid Amount",
    }),
    discountType: z.enum(["CASH", "PERCENTAGE"]),
    discountPercentage: validationSchemas.numberSchema({
      type: "number",
      label: "Discount Percentage",
      required: false,
    }),
    discountAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Discount Amount",
      required: false,
    }),
    extraCharge: validationSchemas.numberSchema({
      type: "number",
      label: "Extra Charge",
    }),
    currentDueAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Current Due Amount",
      //required: false,
    }),
    note: validationSchemas.textSchema({
      label: "Note",
      required: false,
    }),
    purchaserId: z.string(),
    purchaserName: z.string(),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: validationSchemas.numberSchema({
          type: "number",
          label: "Quantity",
        }),
        buyPrice: validationSchemas.numberSchema({
          type: "number",
          label: "Sell Price",
        }),
        updateBuyPrice: validationSchemas.numberSchema({
          type: "number",
          label: "Update Sell Price",
          required: false,
        }),
        totalPrice: validationSchemas.numberSchema({
          type: "number",
          label: "Total Price",
          required: false,
        }),
      }),
    ),
  })
  .refine((data) => Number(data.paidAmount) <= Number(data.totalAmount), {
    message: "Paid amount cannot be greater than total amount",
    path: ["paidAmount"],
  });
export type CartFormType = z.infer<typeof cartSchema>;

export default cartSchema;
