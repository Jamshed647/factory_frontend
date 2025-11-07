/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface CompanyFormComponentProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
}

export default function FactoryFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
}: CompanyFormComponentProps<T>) {
  const { options: companyOption, isLoading: companyLoading } =
    DataFetcher.fetchCompanies({});

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Company Name"
          placeholder="Enter your company name"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="address"
          labelName="Address"
          placeholder="Enter your address"
          form={form}
        />

        {/* <CustomField.Text */}
        {/*   name="email" */}
        {/*   labelName="Email" */}
        {/*   placeholder="Enter your email" */}
        {/*   form={form} */}
        {/* /> */}

        <CustomField.Text
          name="phone"
          labelName="Contact Info"
          placeholder="Enter your contact info"
          form={form}
          optional={false}
        />

        <CustomField.SelectField
          name="status"
          labelName="Factory Status"
          placeholder="Select Factory Status"
          form={form}
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "DEACTIVATE", label: "Deactivate" },
          ]}
        />

        <CustomField.SelectField
          name="companyOwnerId"
          labelName="Company Owner Id"
          placeholder="Enter your company owner id"
          options={companyOption}
          isLoading={companyLoading}
          form={form}
          optional={false}
        />

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
