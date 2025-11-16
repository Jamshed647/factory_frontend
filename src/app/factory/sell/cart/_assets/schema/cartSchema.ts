import { validationSchemas } from "@/types/SchemaType/validationSchema";
import z from "zod";

const cartSchema = z.object({
  customerId: z.string(),
  factoryId: z.string(),
  paymentMethod: z.enum(["CASH", "BANK"]),
  totalSaleAmount: validationSchemas.numberSchema({
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
  sellerId: z.string(),
  sellerName: z.string(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: validationSchemas.numberSchema({
        type: "number",
        label: "Quantity",
      }),
      sellPrice: validationSchemas.numberSchema({
        type: "number",
        label: "Sell Price",
      }),
      updateSellPrice: validationSchemas.numberSchema({
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
});

export type CartFormType = z.infer<typeof cartSchema>;

export default cartSchema;
