import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { customerDefaultValue } from "../../utils/customerDefaultValue";
import BankFormComponent from "../form/bankForm";
import { BankFormType, bankSchema } from "../../schema/bankSchema";

const CreateBankModal = ({ factoryId }: { factoryId?: string }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const customerForm = useForm<BankFormType>({
    resolver: zodResolver(bankSchema),
    defaultValues: customerDefaultValue({ factoryId: factoryId }),
  });

  if (factoryId) {
    customerForm.setValue("factoryId", factoryId);
  }

  const createBank = useApiMutation({
    path: "factory/bank",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      customerForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getEmployeeData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: BankFormType) => {
    createBank.mutate({ ...data });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Add Bank"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Add Bank"
    >
      <BankFormComponent
        selectFactory={!factoryId ? true : false}
        form={customerForm}
        isPending={createBank.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateBankModal;
