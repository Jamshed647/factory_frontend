/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { FormProvider, useForm } from "react-hook-form";
import { DueFormType, dueSchema } from "../schema/dueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { dueDefaultValue } from "../utils/dueDefaultValue";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React, { useState } from "react";
import { CustomField } from "@/components/common/fields/cusField";
import ActionButton from "@/components/common/button/actionButton";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import onFormError from "@/utils/formError";
import { BadgeDollarSign } from "lucide-react";

interface Props {
  factory: any;
}

export default function AddExpenseDialog({ factory }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<DueFormType>({
    resolver: zodResolver(dueSchema),
    defaultValues: dueDefaultValue({ factoryId: factory?.id }),
  });

  const takeDue = useApiMutation({
    path: "factory/cash/transaction",
    method: "PATCH",
    onSuccess: (data: any) => {
      form.reset({});
      queryClient.invalidateQueries({ queryKey: ["getCashDataByFactory"] });
      showToast("success", data);
      setOpen(false);
    },
  });

  if (factory?.id) {
    form.setValue("factoryId", factory?.id);
  }

  // const { options: bankOptions } = DataFetcher.fetchBankAccounts({
  //   path: `factory/bank/factory/${factory?.id}`,
  // });

  // Set default values and reset bankId if CASH
  // useEffect(() => {
  //   form.setValue("factoryId", factory?.id ?? "");
  //   form.setValue("type", type);
  //   form.setValue("transactionType", transactionType || "CASH");
  //
  //   if (form.getValues("transactionType") === "CASH") {
  //     form.setValue("bankId", "");
  //   }
  // }, [factory?.id, type, transactionType, form]);

  const handleSubmit = (payload: DueFormType) => takeDue.mutate(payload);

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-green-500 text-white"
          buttonContent="Add Expense"
          icon={<BadgeDollarSign />}
        />
      }
      open={open}
      handleOpen={() => setOpen(!open)}
      title="Add Expense - Amount"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onFormError)}>
          <div className="space-y-3">
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

            {/* <CustomField.SelectField */}
            {/*   form={form} */}
            {/*   name="transactionType" */}
            {/*   labelName="Transaction Type" */}
            {/*   placeholder="Transaction Type" */}
            {/*   options={[ */}
            {/*     { value: "CASH", label: "Cash" }, */}
            {/*     { value: "ONLINE", label: "Online" }, */}
            {/*   ]} */}
            {/* /> */}

            {/* {form.watch("transactionType") === "ONLINE" && ( */}
            {/*   <CustomField.SelectField */}
            {/*     form={form} */}
            {/*     name="bankId" */}
            {/*     labelName="Bank Account" */}
            {/*     options={bankOptions} */}
            {/*     placeholder="Select your bank account" */}
            {/*   /> */}
            {/* )} */}

            <CustomField.TextArea
              form={form}
              name="note"
              labelName="Note"
              placeholder="Note"
            />

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
