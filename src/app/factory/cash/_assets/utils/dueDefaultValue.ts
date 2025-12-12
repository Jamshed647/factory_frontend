import { DueFormType } from "../schema/dueSchema";

export const dueDefaultValue = (v: Partial<DueFormType>) => {
  return {
    factoryId: v?.factoryId ?? "",
    amount: Number(v?.amount ?? 0),
    type: v?.type ?? "",
    note: v?.note ?? "",
    // transactionType: v?.transactionType ?? "",
    // bankId: v?.bankId ?? "",
  };
};
