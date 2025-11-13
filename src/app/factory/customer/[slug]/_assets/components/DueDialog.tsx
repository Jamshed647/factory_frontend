/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { FormProvider, useForm } from "react-hook-form";
import { DueFormType, dueSchema } from "../schema/dueSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { dueDefaultValue } from "../utils/dueDefaultValue";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import { CustomField } from "@/components/common/fields/cusField";
import ActionButton from "@/components/common/button/actionButton";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { useQueryClient } from "@tanstack/react-query";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import { getFactoryId } from "@/utils/cookie/companyFactoryCookie";
import onFormError from "@/utils/formError";

interface TakeDueDialogProps {
  data: any;
  type: "TAKE" | "PAY";
  transactionType?: "CASH" | "ONLINE";
}

export default function TakeDueDialog({
  data,
  type,
  transactionType,
}: TakeDueDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const factoryId = getFactoryId();

  const takeDue = useApiMutation({
    path: `factory/customer/${data?.id}/due`,
    method: "POST",
    onSuccess: (data: any) => {
      form.reset({});
      queryClient.invalidateQueries({ queryKey: ["getSingleSupplierData"] });
      showToast("success", data);
      setOpen(false);
    },
  });

  const { options: bankOptions } = DataFetcher.fetchBankAccounts({
    path: `factory/bank/factory/${factoryId}`,
  });

  const form = useForm<DueFormType>({
    resolver: zodResolver(dueSchema),
    defaultValues: dueDefaultValue({
      type: type,
      transactionType: transactionType,
    }),
  });

  React.useEffect(() => {
    if (transactionType) {
      form.setValue("transactionType", transactionType);
    }
    if (type) {
      form.setValue("type", type);
    }
    if (form.watch("transactionType") === "CASH") {
      form.setValue("bankId", "");
    }
  }, [transactionType, type, form]);

  // if (form.watch("transactionType") === "CASH") {
  //   form.setValue("bankId", "");
  // }
  //
  // if (transactionType) {
  //   form.setValue("transactionType", transactionType);
  // }
  //
  // if (type) {
  //   form.setValue("type", type);
  // }

  const handleSubmit = (payload: DueFormType) => {
    takeDue.mutate(payload);
    console.log("Take Due:", payload);
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle={`${type === "PAY" ? "bg-green-500 text-white" : "bg-red-500"} text-white`}
          buttonContent={type === "PAY" ? "Pay Due" : "Take Due"}
        />
      }
      open={open}
      handleOpen={() => setOpen(!open)}
      title={`${type} Due - ${data?.name}`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onFormError)}>
          <div className="space-y-3">
            <CustomField.Text
              optional={false}
              form={form}
              name="amount"
              labelName="Amount"
              placeholder="Amount"
            />
            {type === "PAY" && (
              <>
                <CustomField.SelectField
                  form={form}
                  optional={false}
                  viewOnly={true}
                  name="type"
                  options={[
                    { value: "TAKE", label: "Take" },
                    { value: "PAY", label: "Pay" },
                  ]}
                  labelName="Type"
                  placeholder="Type"
                />
              </>
            )}

            <CustomField.SelectField
              form={form}
              optional={false}
              name="transactionType"
              labelName="Transaction Type"
              options={[
                { value: "CASH", label: "Cash" },
                { value: "ONLINE", label: "Online" },
              ]}
              placeholder="Transaction Type"
            />

            {form.watch("transactionType") === "ONLINE" && (
              <CustomField.SelectField
                form={form}
                options={bankOptions}
                name="bankId"
                labelName="Bank Account"
                placeholder="Enter your bank account"
              />
            )}

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
