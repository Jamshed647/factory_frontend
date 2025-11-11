import { DueFormType } from "../schema/dueSchema";

export const dueDefaultValue = (v: Partial<DueFormType>) => {
  return {
    amount: v?.amount ?? 0,
    type: v?.type ?? "",
    transactionType: v?.transactionType ?? "",
    note: v?.note ?? "",
  };
};
