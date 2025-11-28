/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { FormProvider, useForm } from "react-hook-form";
import { DueFormType, dueSchema } from "../schema/dueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { dueDefaultValue } from "../utils/dueDefaultValue";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React, { useEffect, useState } from "react";
import { CustomField } from "@/components/common/fields/cusField";
import ActionButton from "@/components/common/button/actionButton";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import onFormError from "@/utils/formError";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";

interface TakeDueDialogProps {
  factory: any;
  type: "PAY" | "TAKE";
  // transactionType?: "CASH" | "ONLINE";
}

export default function TakeDueDialog({
  factory,
  type,
  //  transactionType = "CASH",
}: TakeDueDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<DueFormType>({
    resolver: zodResolver(dueSchema),
    defaultValues: dueDefaultValue({ type: type, factoryId: factory?.id }),
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
          btnStyle={`${type === "TAKE" ? "bg-green-500" : "bg-red-500"} text-white`}
          buttonContent={type === "TAKE" ? "Cash In" : "Cash Out"}
        />
      }
      open={open}
      handleOpen={() => setOpen(!open)}
      title={`${type === "PAY" ? "Cash In" : "Cash Out"} - ${factory?.name}`}
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
