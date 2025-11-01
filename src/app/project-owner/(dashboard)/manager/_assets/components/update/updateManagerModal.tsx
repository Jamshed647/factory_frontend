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
import ManagerFormComponent from "../form/managerForm";
import {
  ManagerUpdateFormType,
  managerUpdateSchema,
} from "../../schema/managerSchema";
import { managerDefaultValue } from "../../utils/managerDefaultValue";

const UpdateManagerModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyUpdateForm = useForm<ManagerUpdateFormType>({
    resolver: zodResolver(managerUpdateSchema),
    defaultValues: managerDefaultValue(data),
  });

  const createManager = useApiMutation({
    path: `auth/manager/${data.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getManagerData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: ManagerUpdateFormType) => {
    createManager.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Update Manager"
    >
      <ManagerFormComponent
        operation="update"
        form={companyUpdateForm}
        isPending={createManager.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateManagerModal;
