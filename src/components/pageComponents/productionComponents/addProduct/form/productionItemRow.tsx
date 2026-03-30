"use client";
import { useFormContext } from "react-hook-form";
// import { ProductionFormInput } from "../schema/product-schema";
import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import { useState } from "react";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import { useFactory } from "@/utils/factoryInfo";
import { ProductionFormType } from "../schema/product-schema";

const ProductionItemRow = ({
  index,
  remove,
}: {
  index: number;
  remove: () => void;
}) => {
  const form = useFormContext<ProductionFormType>();
  const { factory } = useFactory();
  const [searchProduct, setSearchProduct] = useState("");

  const { options, isLoading } = DataFetcher.fetchProductCategories({
    path: `factory/category/factory/${factory?.id}`,
    filter: {
      type: "sell-product",
      search: searchProduct,
    },
  });
  const transformArray = (
    arr: Array<{ label: string; value: string }>,
  ): Array<{ label: string; value: string }> =>
    arr?.map((item) => ({ label: item.label, value: item.label }));

  return (
    <div className="p-4 space-y-4 rounded-md border">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CustomField.SelectField
            optional={false}
            placeholder="Select Product"
            labelName="Select Product"
            form={form}
            name={`items.${index}.name`}
            options={transformArray(options)}
            isLoading={isLoading}
            onSearch={(e) => setSearchProduct(e)}
          />
        </div>

        <div>
          <CustomField.Number
            labelName="Sell Price"
            placeholder="Enter sellPrice"
            form={form}
            name={`items.${index}.sellPrice`}
          />
        </div>

        <div>
          <CustomField.Number
            labelName="size"
            placeholder="Enter size"
            form={form}
            name={`items.${index}.size`}
          />
        </div>

        <div>
          <CustomField.Number
            labelName="Quantity"
            placeholder="Enter Quantity"
            form={form}
            name={`items.${index}.quantity`}
          />
        </div>
      </div>

      <ActionButton
        type="button"
        variant="destructive"
        handleOpen={() => remove()}
        buttonContent="Remove"
      />
    </div>
  );
};

export default ProductionItemRow;
