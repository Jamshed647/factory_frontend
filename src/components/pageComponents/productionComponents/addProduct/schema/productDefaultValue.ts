/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ProductionFormType } from "./product-schema";

export const productionDefaultValue = (
  v?: Partial<ProductionFormType>,
): ProductionFormType => ({
  factoryId: v?.factoryId ?? "",
  productionId: v?.productionId ?? "",
  totalWeight: Number(v?.totalWeight ?? 0),
  packagingType: v?.packagingType ?? 0, // set a safe default

  allowFractionalPackaging: v?.allowFractionalPackaging ?? false,
  overallTotalWeight: v?.overallTotalWeight ?? undefined,
  unpackedWeight: v?.unpackedWeight ?? undefined,

  isPriviousMuriExiting: v?.isPriviousMuriExiting ?? false,
  prevProductionId: v?.prevProductionId ?? undefined,
  prevMuriWeight: v?.prevMuriWeight ?? undefined,

  items: v?.items?.length
    ? v.items.map((i) => ({
        name: i.name ?? "",
        size: i.size ?? 0,
        sellPrice: i.sellPrice ?? 0,
        quantity: i.quantity ?? 1,
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
