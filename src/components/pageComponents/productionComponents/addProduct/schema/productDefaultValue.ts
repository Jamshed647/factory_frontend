import { ProductionFormType } from "./product-schema";

export const productionDefaultValue = (
  v?: Partial<ProductionFormType>,
): ProductionFormType => ({
  factoryId: v?.factoryId ?? "",
  name: v?.name ?? "",
  totalProductionAmount: v?.totalProductionAmount ?? 0,
  extraCost: v?.extraCost ?? 0,
  status: v?.status ?? "PENDING",
  note: v?.note ?? "",

  items: v?.items?.length
    ? v.items.map((i) => ({
        productId: i.productId ?? "",
        quantity: i.quantity ?? 1,
        buyPrice: i.buyPrice ?? 0,
        totalPrice: i.totalPrice ?? 0,
      }))
    : [
        {
          productId: "",
          quantity: 1,
          buyPrice: 0,
          totalPrice: 0,
        },
      ],
});
