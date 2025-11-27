/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { FormProvider, useFieldArray, UseFormReturn } from "react-hook-form";
import ProductionItemRow from "./productionItemRow";
import { PlusIcon } from "lucide-react";
import onFormError from "@/utils/formError";
import { Button } from "@/components/ui/button";

interface ProductionFormType {
  isPending: boolean;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  // factoryId?: string;
}

const AddProductForm = ({
  isPending,
  form,
  onSubmit,
  // factoryId,
}: ProductionFormType) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onFormError)}
        className="space-y-6"
      >
        <CustomField.Text
          labelName="Total Weight"
          placeholder="Enter Total Weight"
          form={form}
          name="totalWeight"
        />

        <CustomField.Number
          labelName="Packaging Type"
          placeholder="Enter Packaging Type"
          form={form}
          name="packagingType"
        />

        {/* NOTE */}
        {/* <div> */}
        {/*   <CustomField.TextArea */}
        {/*     labelName="Note" */}
        {/*     placeholder="Enter Note" */}
        {/*     form={form} */}
        {/*     name="note" */}
        {/*   /> */}
        {/* </div> */}

        {/* DYNAMIC ITEMS */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Product Items</h2>
            <ActionButton
              type="button"
              disabled={isPending}
              icon={<PlusIcon />}
              handleOpen={() =>
                append({
                  productId: "",
                  quantity: 1,
                  buyPrice: 0,
                  totalPrice: 0,
                })
              }
              buttonContent="Add Item"
              variant="outline"
              className="py-2 px-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            />{" "}
          </div>

          {fields.map((field, index) => (
            <ProductionItemRow
              // factoryId={factoryId}
              key={field.id}
              index={index}
              remove={() => remove(index)}
            />
          ))}
        </div>

        {/* SUBMIT */}

        <Button type="submit">Submit Production</Button>

        {/* <ActionButton */}
        {/*   //          className="py-2 px-4 w-full font-bold text-white bg-blue-500 rounded hover:bg-blue-700" */}
        {/*   buttonContent="Submit Production" */}
        {/*   handleOpen={() => form.handleSubmit(onSubmit, onFormError)} */}
        {/*   // handleOpen={() => console.log("Submit")} */}
        {/*   isPending={isPending} */}
        {/* /> */}
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
