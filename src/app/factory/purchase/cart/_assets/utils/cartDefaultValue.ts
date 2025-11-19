import { CartFormType } from "../schema/cartSchema";

const cartDefaultValue = (v: Partial<CartFormType> = {}) => {
  return {
    factoryId: v?.factoryId ?? "",
    supplierId: v?.supplierId ?? "",
    paymentMethod: v?.paymentMethod ?? "CASH",
    totalPurchaseAmount: v?.totalPurchaseAmount ?? 0,
    paidAmount: v?.paidAmount ?? 0,
    discountType: v?.discountType ?? "CASH",
    discountPercentage: v?.discountPercentage ?? 0,
    discountAmount: v?.discountAmount ?? 0,
    extraCharge: v?.extraCharge ?? 0,
    purchaserId: v?.purchaserId ?? "",
    purchaserName: v?.purchaserName ?? "",
    note: v?.note ?? "",
    items: v?.items ?? [],
  };
};
export default cartDefaultValue;
