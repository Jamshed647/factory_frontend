/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { ExpenseFormType } from "../schema/dueSchema";

export const expenseDefaultValue = (v: Partial<ExpenseFormType>) => {
  return {
    factoryId: v?.factoryId ?? "",
    title: v?.title ?? "",
    category: v?.category ?? "",
    amount: v?.amount!,
    // type: v?.type ?? "",
    // note: v?.note ?? "",
    transactionType: v?.transactionType ?? "",
    bankId: v?.bankId ?? "",
  };
};
