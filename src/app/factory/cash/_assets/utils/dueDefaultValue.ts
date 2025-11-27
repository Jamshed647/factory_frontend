/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { DueFormType } from "../schema/dueSchema";

export const dueDefaultValue = (v: Partial<DueFormType>) => {
  return {
    factoryId: v?.factoryId ?? "",
    amount: v?.amount!,
    type: v?.type ?? "",
    transactionType: v?.transactionType ?? "",
    bankId: v?.bankId ?? "",
    note: v?.note ?? "",
  };
};
