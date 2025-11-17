import { CartFormType } from "../schema/cartSchema";

const cartDefaultValue = (v: Partial<CartFormType> = {}) => {
  return {
    factoryId: v?.factoryId ?? "",
    customerId: v?.customerId ?? "",
    paymentMethod: v?.paymentMethod ?? "CASH",
    bankId: v?.bankId ?? "",
    totalSaleAmount: v?.totalSaleAmount ?? 0,
    totalAmount: v?.totalAmount ?? 0,
    paidAmount: v?.paidAmount ?? 0,
    discountType: v?.discountType ?? "CASH",
    discountPercentage: v?.discountPercentage ?? 0,
    discountAmount: v?.discountAmount ?? 0,
    extraCharge: v?.extraCharge ?? 0,
    currentDueAmount: v?.currentDueAmount ?? 0,
    sellerId: v?.sellerId ?? "",
    sellerName: v?.sellerName ?? "",
    items: v?.items ?? [],
  };
};
export default cartDefaultValue;
