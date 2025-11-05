/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface EmployeeFormComponentProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
}

export default function EmployeeFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
}: EmployeeFormComponentProps<T>) {
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

        {/* <CustomField.Text */}
        {/*   name="firstName" */}
        {/*   labelName="First Name" */}
        {/*   placeholder="Enter your first name" */}
        {/*   form={form} */}
        {/*   optional={false} */}
        {/* /> */}
        {/**/}
        {/* <CustomField.Text */}
        {/*   name="lastName" */}
        {/*   labelName="Last Name" */}
        {/*   placeholder="Enter your last name" */}
        {/*   form={form} */}
        {/* /> */}

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

        {/* <CustomField.SelectField */}
        {/*   name="factoryStatus" */}
        {/*   labelName="Factory Status" */}
        {/*   placeholder="Select Factory Status" */}
        {/*   form={form} */}
        {/*   options={[ */}
        {/*     { value: "Active", label: "Active" }, */}
        {/*     { value: "Inactive", label: "Inactive" }, */}
        {/*   ]} */}
        {/* /> */}

        {operation === "create" && (
          <>
            <CustomField.Text
              name="pinCode"
              labelName="Pin Code"
              placeholder="Enter your pin code"
              form={form}
              optional={false}
            />
            <CustomField.Text
              name="confirmPinCode"
              labelName="Confirm Pin Code"
              placeholder="Enter your confirm pin code"
              form={form}
              optional={false}
            />
          </>
        )}

        <ActionButton
          buttonContent={operation}
          type="submit"
          isPending={isPending}
          handleOpen={form.handleSubmit(onSubmit)}
          btnStyle="w-full bg-green-500 text-white"
        />
      </form>
    </FormProvider>
  );
}
