/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  updateProductSchema,
  UpdateProductType,
} from "../../schema/productSchema";
import ProductFormComponent from "../form/productForm";

const UpdateSalesmanModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyUpdateForm = useForm<UpdateProductType>({
    resolver: zodResolver(updateProductSchema),
    //defaultValues: employeeDefaultValue(data),
  });

  const updateEmployee = useApiMutation({
    path: `auth/salesman/${data.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getSalesmanData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: UpdateProductType) => {
    updateEmployee.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Update Salesman"
    >
      <ProductFormComponent
        operation="update"
        form={companyUpdateForm}
        isPending={updateEmployee.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateSalesmanModal;
