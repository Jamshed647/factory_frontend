import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import ManagerFormComponent from "../form/managerForm";
import { ManagerFormType, managerSchema } from "../../schema/managerSchema";
import { managerDefaultValue } from "../../utils/managerDefaultValue";

const CreateManagerModal = ({
  factoryId,
}: {
  factoryId: string | undefined;
}) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const managerForm = useForm<ManagerFormType>({
    resolver: zodResolver(managerSchema),
    defaultValues: managerDefaultValue({ factoryId: factoryId }),
  });

  const createManager = useApiMutation({
    path: "auth/manager",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getManagerData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: ManagerFormType) => {
    const { confirmPinCode, ...formData } = data;
    createManager.mutate(formData);
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Manager"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create Manager"
    >
      <ManagerFormComponent
        selectFactory={!factoryId ? true : false}
        form={managerForm}
        isPending={createManager.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateManagerModal;
