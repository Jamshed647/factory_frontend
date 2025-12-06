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

interface TakeDueDialogProps {
  bank: any;
  type: "PAY" | "TAKE";
  // transactionType?: "CASH" | "ONLINE";
}

export default function TakeDueDialog({ bank, type }: TakeDueDialogProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<DueFormType>({
    resolver: zodResolver(dueSchema),
    defaultValues: dueDefaultValue({ type: type, bankId: bank?.id }),
  });

  const takeDue = useApiMutation({
    path: "factory/bank/transaction",
    method: "POST",
    onSuccess: (data: any) => {
      form.reset({});
      queryClient.invalidateQueries({ queryKey: ["getSingleBankData"] });
      queryClient.invalidateQueries({ queryKey: ["getSingleBankHistoryData"] });
      showToast("success", data);
      setOpen(false);
    },
  });

  if (bank?.id) {
    form.setValue("bankId", bank?.id);
  }

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
      title={`${type === "TAKE" ? "Cash In" : "Cash Out"} - ${bank?.name}`}
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
