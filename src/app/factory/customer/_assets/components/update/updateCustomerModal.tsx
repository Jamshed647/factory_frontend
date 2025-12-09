/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { customerSchema, CustomerFormType } from "../../schema/customerSchema";
import { bankDefaultValue } from "../../utils/customerDefaultValue";
import CustomerFormComponent from "../form/customerForm";

const UpdateCustomerModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const bankForm = useForm<CustomerFormType>({
    resolver: zodResolver(customerSchema),
    defaultValues: bankDefaultValue(data),
  });

  if (data?.factoryId) {
    bankForm.setValue("factoryId", data?.factoryId);
  }

  const updateCustomer = useApiMutation({
    path: `factory/bank/${data?.id}`,
    method: "PATCH",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      bankForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCustomerData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: CustomerFormType) => {
    updateCustomer.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          tooltipContent="Update Customer"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create Customer"
    >
      <CustomerFormComponent
        operation="update"
        selectFactory={!data?.factoryId ? true : false}
        form={bankForm}
        isPending={updateCustomer.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateCustomerModal;
