/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React, { useState } from "react";
import { CustomField } from "@/components/common/fields/cusField";
import ActionButton from "@/components/common/button/actionButton";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import onFormError from "@/utils/formError";
import { EditIcon } from "lucide-react";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import { FormProvider, useForm } from "react-hook-form";
import { ExpenseFormType, expenseSchema } from "../schema/dueSchema";
import { expenseDefaultValue } from "../utils/dueDefaultValue";
import { getChangedFields } from "@/utils/formatter/formChangedValues";

interface Props {
  factory: any;
  value: any;
}

export default function UpdateExpenseDialog({ factory, value }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  //  console.log(value);

  const form = useForm<ExpenseFormType>({
    resolver: zodResolver(expenseSchema),
    defaultValues: expenseDefaultValue({ ...value }),
  });

  const takeDue = useApiMutation({
    path: `factory/expense/${value.id}`,
    method: "PATCH",
    onSuccess: (data: any) => {
      form.reset({});
      queryClient.invalidateQueries({ queryKey: ["getExpenseDataByFactory"] });
      showToast("success", data);
      setOpen(false);
    },
  });

  // if (factory?.id) {
  //   form.setValue("factoryId", factory?.id);
  // }

  const { options: bankOptions } = DataFetcher.fetchBankAccounts({
    path: `factory/bank/factory/${factory?.id}`,
  });
  const handleSubmit = () => {
    const updatedData = getChangedFields(form, value);
    takeDue.mutate(updatedData);
  };

  return (
    <DialogWrapper
      triggerContent={<EditIcon className="w-5 h-5 cursor-pointer" />}
      open={open}
      handleOpen={() => setOpen(!open)}
      title="Add Expense - Amount"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onFormError)}>
          <div className="space-y-3">
            <CustomField.Text
              placeholder="Enter your title"
              form={form}
              name="title"
              labelName="Title"
            />

            <CustomField.Text
              form={form}
              name="category"
              labelName="Category"
              placeholder="Enter your category "
            />

            <CustomField.Text
              form={form}
              name="amount"
              labelName="Amount"
              placeholder="Amount"
            />

            {/* {type === "PAY" && ( */}
            {/*   <CustomField.SelectField */}
            {/*     form={form} */}
            {/*     placeholder="Type" */}
            {/*     name="type" */}
            {/*     labelName="Type" */}
            {/*     options={[ */}
            {/*       { value: "TAKE", label: "Take" }, */}
            {/*       { value: "PAY", label: "Pay" }, */}
            {/*     ]} */}
            {/*     viewOnly */}
            {/*   /> */}
            {/* )} */}

            <CustomField.SelectField
              form={form}
              name="transactionType"
              labelName="Transaction Type"
              placeholder="Transaction Type"
              options={[
                { value: "CASH", label: "Cash" },
                { value: "ONLINE", label: "Online" },
              ]}
            />

            {form.watch("transactionType") === "ONLINE" && (
              <CustomField.SelectField
                form={form}
                name="bankId"
                labelName="Bank Account"
                options={bankOptions}
                placeholder="Select your bank account"
              />
            )}

            {/* <CustomField.TextArea */}
            {/*   form={form} */}
            {/*   name="note" */}
            {/*   labelName="Note" */}
            {/*   placeholder="Note" */}
            {/* /> */}

            <div className="flex justify-end">
              <ActionButton
                btnStyle="bg-blue-500 text-white"
                isPending={takeDue.isPending}
                buttonContent="Submit"
                type="submit"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </DialogWrapper>
  );
}
