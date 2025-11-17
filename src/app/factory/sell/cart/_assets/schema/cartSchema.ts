import { validationSchemas } from "@/types/SchemaType/validationSchema";
import z from "zod";

const cartSchema = z
  .object({
    customerId: z.string(),
    factoryId: z.string(),
    paymentMethod: z.enum(["CASH", "BANK"]),
    bankId: validationSchemas.textSchema({
      label: "Bank Account",
      required: false,
    }),
    totalSaleAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Total Sale Price",
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
    currentDueAmount: validationSchemas.numberSchema({
      type: "number",
      label: "Current Due Amount",
      //required: false,
    }),
    extraCharge: validationSchemas.numberSchema({
      type: "number",
      label: "Extra Charge",
      required: false,
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
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "BANK") {
        return !!data.bankId; // must not be null/empty
      }
      return true;
    },
    {
      message: "Bank is required when payment method is BANK",
      path: ["bankId"], // attach error to bankId field
    },
  );

export type CartFormType = z.infer<typeof cartSchema>;

export default cartSchema;
