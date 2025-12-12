import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  SupplierUpdateFormType,
  supplierUpdateSchema,
} from "../../schema/customerSchema";
import { bankDefaultValue } from "../../utils/customerDefaultValue";
import SupplierFormComponent from "../form/supplierForm";

const UpdateSupplierModal = ({
  value,
}: {
  value: SupplierUpdateFormType & {
    id: string;
  };
}) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const bankForm = useForm<SupplierUpdateFormType>({
    resolver: zodResolver(supplierUpdateSchema),
    defaultValues: bankDefaultValue(value),
  });

  const createSupplier = useApiMutation({
    path: `factory/supplier/${value?.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      bankForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getSupplierDataToSupply"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: SupplierUpdateFormType) => {
    createSupplier.mutate({ ...data });
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Create Supplier"
    >
      <SupplierFormComponent
        operation="update"
        form={bankForm}
        isPending={createSupplier.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateSupplierModal;
