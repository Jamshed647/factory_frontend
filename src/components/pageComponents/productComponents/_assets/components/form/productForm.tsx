/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface ProductFormComponent<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
}

export default function ProductFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
}: ProductFormComponent<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        {/* <CustomField.Text */}
        {/*   name="factory_id" */}
        {/*   labelName="Factory Id" */}
        {/*   placeholder="Enter your factory id" */}
        {/*   form={form} */}
        {/*   optional={false} */}
        {/* /> */}

        <CustomField.Text
          name="product_type"
          labelName="Product Type"
          placeholder="Enter your product type"
          form={form}
          optional={false}
        />

        <CustomField.Text
          name="name"
          labelName="Product Name"
          placeholder="Enter your product name"
          form={form}
          optional={false}
        />

        <CustomField.Text
          name="category"
          labelName="Category"
          placeholder="Enter your category"
          form={form}
          optional={false}
        />

        <CustomField.SelectField
          name="unit_type"
          labelName="Unit Type"
          placeholder="Select Unit Type"
          form={form}
          options={[
            { value: "KG", label: "Kg" },
            { value: "PCS", label: "Pcs" },
            { value: "BAG", label: "Bag" },
            { value: "METER", label: "Meter" },
            { value: "LITER", label: "Liter" },
            { value: "ROLL", label: "Roll" },
          ]}
        />
        <CustomField.Text
          name="purchase_price"
          labelName="Purchase Price"
          placeholder="Enter your purchase price"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="selling_price"
          labelName="Selling Price"
          placeholder="Enter your selling price"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="current_stock"
          labelName="Current Stock"
          placeholder="Enter your current stock"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="min_stock_level"
          labelName="Min Stock Level"
          placeholder="Enter your min stock level"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="description"
          labelName="Description"
          placeholder="Enter your description"
          form={form}
          optional={false}
        />
        <CustomField.Text
          name="image_url"
          labelName="Image Url"
          placeholder="Enter your image url"
          form={form}
          optional={false}
        />
        <CustomField.SelectField
          name="status"
          labelName="Status"
          placeholder="Select Status"
          form={form}
          options={[
            { value: "ACTIVE", label: "Active" },
            { value: "INACTIVE", label: "Inactive" },
          ]}
        />

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
