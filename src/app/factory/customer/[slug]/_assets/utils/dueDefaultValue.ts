import { DueFormType } from "../schema/dueSchema";

export const dueDefaultValue = (v: Partial<DueFormType>) => {
  return {
    amount: Number(v?.amount) ?? 0,
    type: v?.type ?? "",
    transactionType: v?.transactionType ?? "",
    bankId: v?.bankId ?? "",
    note: v?.note ?? "",
  };
};
