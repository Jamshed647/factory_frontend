import { ProductionFormType } from "./product-schema";

export const productionDefaultValue = (
  v?: Partial<ProductionFormType>,
): ProductionFormType => ({
  factoryId: v?.factoryId ?? "",
  name: v?.name ?? "",
  extraCost: v?.extraCost ?? 0,
  status: v?.status ?? "PENDING",
  note: v?.note ?? "",

  items: v?.items ?? [],
  totalProductionAmount: v?.items
    ? v.items.reduce((sum, item) => sum + (item.totalPrice as number), 0)
    : 0,
});
