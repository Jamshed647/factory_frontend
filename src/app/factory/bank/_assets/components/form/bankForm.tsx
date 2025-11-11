/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface BankFormComponentProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "add";
  selectFactory?: boolean;
}

export default function BankFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "add",
  selectFactory = false,
}: BankFormComponentProps<T>) {
  const { options: factoryOption, isLoading } = DataFetcher.fetchFactories({});

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Bank Name"
          form={form}
          placeholder="Enter your bank name"
        />

        <CustomField.Text
          name="accountNo"
          labelName="Bank Account No"
          form={form}
          placeholder="Enter your account no"
        />

        <CustomField.Text
          name="branchAddress"
          labelName="Branch Address"
          form={form}
          placeholder="Enter your branch address"
        />

        <CustomField.Text
          name="balance"
          labelName="Balance"
          form={form}
          placeholder="Enter your balance"
          optional={true}
        />

        {selectFactory && (
          <CustomField.SelectField
            name="factoryId"
            labelName="Factory"
            placeholder="Select Factory"
            form={form}
            options={factoryOption}
            isLoading={isLoading}
          />
        )}

        <ActionButton
          buttonContent={operation}
          type="submit"
          isPending={isPending}
          handleOpen={form.handleSubmit(onSubmit, onFormError)}
          btnStyle="w-full bg-green-500 text-white"
        />
      </form>
    </FormProvider>
  );
}
