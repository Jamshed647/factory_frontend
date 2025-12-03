/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import React from "react";

interface Props {
  factoryId: string;
  data?: any;
  componentType?: string;
}

const UpdateProductNameModal = ({
  factoryId,
  data,
  componentType = "add",
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [pName, setPName] = React.useState(data?.categoryName ?? "");
  // const [pType, setPType] = React.useState(data?.categoryType ?? "");

  const addProductName = useApiMutation({
    path: `factory/category/${factoryId}`,
    method: "PATCH",
    onSuccess: () => {
      setOpen(false);
    },
  });

  const handleAddProductName = () => {
    addProductName.mutate({
      categoryName: pName,
      //   categoryType: pType,
    });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="py-0 px-2 rounded-md border"
          icon={<EditIcon className="w-5 h-5" />}
          tooltipContent="Update Product Name"
        />
      }
      open={open}
      handleOpen={setOpen}
      title={`${componentType} Product Name`}
    >
      <div>
        <Label className="mb-2">Product Name</Label>
        <input
          type="text"
          value={pName}
          onChange={(e) => setPName(e.target.value)}
          placeholder="Enter product name"
          className="py-2 px-3 w-full text-sm rounded-md border border-gray-300"
        />

        <CustomField.SingleSelectField
          name="productType"
          labelName="Product Type"
          defaultValue={data?.categoryType}
          disabled
          // onChange={(e) => setPType(e.target.value)}
          options={["sell-product", "purchase-product"]}
          placeholder="Select Product Type"
        />

        <div className="flex justify-end mt-4">
          <ActionButton
            buttonContent="Add"
            btnStyle="w-full bg-blue-500 text-white"
            handleOpen={() => handleAddProductName()}
          />
        </div>
      </div>
    </DialogWrapper>
  );
};

export default UpdateProductNameModal;
