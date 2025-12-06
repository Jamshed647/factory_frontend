/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import onFormError from "@/utils/formError";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface ProductFormComponent<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  isPending: boolean;
  operation?: "update" | "create";
  isFactoryId?: boolean;
}

export default function ProductFormComponent<T extends Record<string, any>>({
  form,
  onSubmit,
  isPending,
  operation = "create",
  isFactoryId = true,
}: ProductFormComponent<T>) {
  const { options } = DataFetcher.fetchFactories({});

  // const { options: productCategories } = DataFetcher.fetchProductCategories({});

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6 w-full"
      >
        <CustomField.Text
          name="name"
          labelName="Product Name"
          placeholder="Enter your product name"
          form={form}
          optional={false}
        />

        {isFactoryId && operation !== "update" && (
          <CustomField.SelectField
            name="factoryId"
            labelName="Factory Id"
            placeholder="Enter your factory id"
            form={form}
            options={options}
            optional={false}
          />
        )}

        <CustomField.SelectField
          name="category"
          labelName="Category"
          placeholder="Enter your category"
          form={form}
          options={
            [
              { value: "rice", label: "Rice" },
              { value: "muri", label: "Muri" },
            ]
            // productCategories
          }
          optional={false}
        />
        <CustomField.SelectField
          name="quantityType"
          labelName="Unit Type"
          placeholder="Select Unit Type"
          form={form}
          options={[
            { value: "kg", label: "Kg" },
            { value: "pcs", label: "Pcs" },
            { value: "bag", label: "Bag" },
            { value: "meter", label: "Meter" },
            { value: "liter", label: "Liter" },
            { value: "roll", label: "Roll" },
          ]}
          optional={false}
        />
        <CustomField.Text
          name="quantity"
          labelName="Quantity"
          placeholder="Enter your quantity"
          form={form}
          optional={false}
        />
        {/* <CustomField.SelectField */}
        {/*   name="productType" */}
        {/*   labelName="Product Type" */}
        {/*   placeholder="Select Product Type" */}
        {/*   form={form} */}
        {/*   options={[ */}
        {/*     { value: "Raw_Product", label: "Raw Product" }, */}
        {/*     { value: "Finished_Product", label: "Finished Product" }, */}
        {/*   ]} */}
        {/*   optional={false} */}
        {/* /> */}

        <CustomField.Number
          name="buyPrice"
          labelName="Buy Price"
          placeholder="Enter your buy price"
          form={form}
          // optional={false}
        />
        <CustomField.Number
          name="sellPrice"
          labelName="Sell Price"
          placeholder="Enter your sell price"
          form={form}
          // optional={false}
        />
        <CustomField.Text
          name="note"
          labelName="Note"
          placeholder="Enter your note"
          form={form}
          // optional={false}
        />
        {/* <CustomField.SelectField */}
        {/*   name="status" */}
        {/*   labelName="Status" */}
        {/*   placeholder="Select Status" */}
        {/*   form={form} */}
        {/*   options={[ */}
        {/*     { value: "ACTIVE", label: "Active" }, */}
        {/*     { value: "INACTIVE", label: "Inactive" }, */}
        {/*   ]} */}
        {/* /> */}

        {/* <CustomField.Text */}
        {/*   name="image_url" */}
        {/*   labelName="Image Url" */}
        {/*   placeholder="Enter your image url" */}
        {/*   form={form} */}
        {/* /> */}
        {/* <CustomField.SelectField */}
        {/*   name="status" */}
        {/*   labelName="Status" */}
        {/*   placeholder="Select Status" */}
        {/*   form={form} */}
        {/*   options={[ */}
        {/*     { value: "ACTIVE", label: "Active" }, */}
        {/*     { value: "INACTIVE", label: "Inactive" }, */}
        {/*   ]} */}
        {/* /> */}

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
