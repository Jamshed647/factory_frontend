/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface CustomerFormComponentProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
  selectFactory?: boolean;
}

export default function CustomerFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
  selectFactory = false,
}: CustomerFormComponentProps<T>) {
  const { options: factoryOption, isLoading } = DataFetcher.fetchFactories({});

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="First Name"
          placeholder="Enter your name"
          form={form}
        />
        <CustomField.Text
          name="phone"
          labelName="Contact Info"
          placeholder="Enter your contact info"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="address"
          labelName="Address"
          placeholder="Enter your address"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="initialDue"
          labelName="Initial Due"
          placeholder="Enter your initial due"
          form={form}
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
