/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ProductionFormType } from "./product-schema";

export const productionDefaultValue = (
  v?: Partial<ProductionFormType>,
): ProductionFormType => ({
  factoryId: v?.factoryId ?? "",
  productionId: v?.productionId ?? "",
  totalWeight: v?.totalWeight!,
  packagingType: v?.packagingType!,

  items: v?.items?.length
    ? v.items.map((i) => ({
        name: i.name ?? "",
        size: i.size!,
        sellPrice: i.sellPrice!,
        quantity: i.quantity!,
      }))
    : [
        {
          name: "",
          size: 0,
          sellPrice: 0,
          quantity: 1,
        },
      ],
});
