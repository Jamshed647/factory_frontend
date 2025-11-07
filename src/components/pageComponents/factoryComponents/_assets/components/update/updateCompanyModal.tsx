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
  FactoryUpdateFormType,
  factoryUpdateSchema,
} from "../../schema/companySchema";
import FactoryFormComponent from "../form/factoryForm";
import { factoryDefaultValue } from "../../utils/factoryDefaultValue";

const UpdateCompanyModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyUpdateForm = useForm<FactoryUpdateFormType>({
    resolver: zodResolver(factoryUpdateSchema),
    defaultValues: factoryDefaultValue(data),
  });

  const createUser = useApiMutation({
    path: `auth/factory/${data.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getFactoryData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: FactoryUpdateFormType) => {
    createUser.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Update Factory"
    >
      <FactoryFormComponent
        operation="update"
        form={companyUpdateForm}
        isPending={createUser.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateCompanyModal;
