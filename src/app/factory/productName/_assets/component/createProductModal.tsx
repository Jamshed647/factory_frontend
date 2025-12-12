import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import ActionButton from "@/components/common/button/actionButton";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { CustomField } from "@/components/common/fields/cusField";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import React from "react";

const CreateProductNameModal = ({ factoryId }: { factoryId: string }) => {
  const [open, setOpen] = React.useState(false);
  const [pName, setPName] = React.useState("");
  const [pType, setPType] = React.useState("");
  const queryClient = useQueryClient();

  const addProductName = useApiMutation({
    path: "factory/category",
    method: "POST",
    onSuccess: (data) => {
      setOpen(false);
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getProductNameData"] });
    },
  });

  const handleAddProductName = () => {
    addProductName.mutate({
      factoryId: factoryId,
      categoryName: pName,
      categoryType: "sell-product",
    });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="py-0 px-2 rounded-md border"
          icon={<PlusIcon className="w-5 h-5" />}
          buttonContent="Add Product Name"
          tooltipContent="Create Product"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Add Product Name"
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
          defaultValue={pType}
          onChange={(e) => setPType(e.target.value)}
          options={["sell-product", "purchase-product"]}
          placeholder="Select Product Type"
        />

        <div className="flex justify-end mt-4">
          <ActionButton
            isPending={addProductName.isPending}
            buttonContent="Add"
            btnStyle="w-full bg-blue-500 text-white"
            handleOpen={() => handleAddProductName()}
          />
        </div>
      </div>
    </DialogWrapper>
  );
};

export default CreateProductNameModal;
