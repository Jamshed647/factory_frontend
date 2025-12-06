import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import BankFormComponent from "../form/bankForm";
import { BankFormType, bankSchema } from "../../schema/bankSchema";
import { bankDefaultValue } from "../../utils/customerDefaultValue";

const CreateBankModal = ({ factoryId }: { factoryId?: string }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const bankForm = useForm<BankFormType>({
    resolver: zodResolver(bankSchema),
    defaultValues: bankDefaultValue({ factoryId: factoryId }),
  });

  if (factoryId) {
    bankForm.setValue("factoryId", factoryId);
  }

  const createBank = useApiMutation({
    path: "factory/bank",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      bankForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getBankDataByFactory"] });
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
        form={bankForm}
        isPending={createBank.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateBankModal;
