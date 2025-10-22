import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import FactoryFormComponent from "../form/factoryForm";
import { FactoryFormType, factorySchema } from "../../schema/companySchema";
import { factoryDefaultValue } from "../../utils/factoryDefaultValue";
import { useAuth } from "@/hooks/hooks";

const CreateFactoryModal = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const companyForm = useForm<FactoryFormType>({
    resolver: zodResolver(factorySchema),
    defaultValues: factoryDefaultValue(),
  });

  const createFactory = useApiMutation({
    path: "api/v1/auth/factory",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCompanyData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: FactoryFormType) => {
    createFactory.mutate({ ...data, companyOwnerId: user?.id });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Factory"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create factory"
    >
      <FactoryFormComponent
        form={companyForm}
        isPending={createFactory.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateFactoryModal;
