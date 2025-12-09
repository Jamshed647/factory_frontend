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

const CreateEmployeeModal = ({ factoryId }: { factoryId?: string }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const bankForm = useForm<CustomerFormType>({
    resolver: zodResolver(customerSchema),
    defaultValues: bankDefaultValue({ factoryId: factoryId }),
  });

  if (factoryId) {
    bankForm.setValue("factoryId", factoryId);
  }

  const createCustomer = useApiMutation({
    path: "factory/customer",
    method: "POST",
    onSuccess: (data) => {
      bankForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCustomerData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: CustomerFormType) => {
    createCustomer.mutate({ ...data });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Customer"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create Customer"
    >
      <CustomerFormComponent
        selectFactory={!factoryId ? true : false}
        form={bankForm}
        isPending={createCustomer.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateEmployeeModal;
