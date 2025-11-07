import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ProductFormComponent from "../form/productForm";
import { createProductSchema, ProductType } from "../../schema/productSchema";
import { productDefaultValue } from "../../utils/productDefaultValue";
import { useAuth } from "@/hooks/hooks";

const CreateProductModal = ({ factoryId }: { factoryId: string }) => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const productForm = useForm<ProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: productDefaultValue({
      factory_id: factoryId,
      created_by: user?.id,
    }),
  });

  const createFactory = useApiMutation({
    path: "auth/salesman",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      productForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getSalesmanData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: ProductType) => {
    console.log("Create Product", data, factoryId);

    //  createFactory.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Product"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Add Product"
    >
      <ProductFormComponent
        form={productForm}
        isPending={createFactory.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateProductModal;
