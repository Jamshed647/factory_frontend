"use client";
import { useFormContext } from "react-hook-form";
import { ProductionFormType } from "../schema/product-schema";
import ActionButton from "@/components/common/button/actionButton";
import { CustomField } from "@/components/common/fields/cusField";
import DataFetcher from "@/hooks/fetchDataCollection/hooksExport";
import { useState } from "react";

const ProductionItemRow = ({
  factoryId,
  index,
  remove,
}: {
  index: number;
  remove: () => void;
  factoryId?: string;
}) => {
  const form = useFormContext<ProductionFormType>();
  const [searchProduct, setSearchProduct] = useState("");

  const { options, isLoading } = DataFetcher.fetchFactories({
    path: `factory/product/factory/${factoryId}`,
    filter: {
      type: "RAW",
      search: searchProduct,
    },
  });

  return (
    <div className="p-4 space-y-4 rounded-md border">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <CustomField.SelectField
            optional={false}
            placeholder="Select Product"
            labelName="Select Product"
            form={form}
            name={`items.${index}.productId`}
            options={options}
            isLoading={isLoading}
            onSearch={(e) => setSearchProduct(e)}
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

        <div>
          <CustomField.Number
            labelName="Buy Price"
            placeholder="Enter Buy Price"
            form={form}
            name={`items.${index}.buyPrice`}
          />
        </div>

        <div>
          <CustomField.Number
            labelName="Total Price"
            placeholder="Enter Total Price"
            form={form}
            name={`items.${index}.totalPrice`}
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
