/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { FormProvider, UseFormReturn } from "react-hook-form";
import onFormError from "@/utils/formError";

interface ProductionFormType {
  isPending: boolean;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}

const AddProductForm = ({ isPending, form, onSubmit }: ProductionFormType) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6"
      >
        <div className="flex justify-end">
          {/* SUBMIT */}
          <ActionButton
            type="submit"
            className="py-2 px-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            buttonContent="Submit Production"
            isPending={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* NAME */}
          <div>
            <CustomField.Text
              labelName="Name"
              placeholder="Enter Production Name"
              form={form}
              name="name"
            />
          </div>

          {/* AMOUNTS */}
          <div>
            <CustomField.Number
              labelName="Total Production Amount"
              placeholder="Enter Total Production Amount"
              form={form}
              name="totalProductionAmount"
              viewOnly={true}
            />
          </div>

          <div>
            <CustomField.Number
              labelName="Extra Cost"
              placeholder="Enter Extra Cost"
              form={form}
              name="extraCost"
            />
          </div>

          {/* STATUS */}
          {/* <div> */}
          {/*   <CustomField.SelectField */}
          {/*     labelName="Status" */}
          {/*     placeholder="Select Status" */}
          {/*     form={form} */}
          {/*     name="status" */}
          {/*     options={[ */}
          {/*       { value: "PENDING", label: "PENDING" }, */}
          {/*       { value: "COMPLETED", label: "COMPLETED" }, */}
          {/*       { value: "CANCELLED", label: "CANCELLED" }, */}
          {/*     ]} */}
          {/*   /> */}
          {/* </div> */}

          {/* NOTE */}
          <div>
            <CustomField.TextArea
              labelName="Note"
              placeholder="Enter Note"
              form={form}
              name="note"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
