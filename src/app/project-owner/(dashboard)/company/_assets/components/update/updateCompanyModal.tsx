/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import CompanyFormComponent from "../form/companyForm";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import {
  CompanyUpdateFormType,
  companyUpdateSchema,
} from "../../schema/companySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { companyDefaultValue } from "../../utils/companyDefaultValue";
import { getChangedFields } from "@/utils/formatter/formChangedValues";

const UpdateCompanyModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyUpdateForm = useForm<CompanyUpdateFormType>({
    resolver: zodResolver(companyUpdateSchema),
    defaultValues: companyDefaultValue(data),
  });

  const createUser = useApiMutation({
    path: `auth/company/${data.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCompanyTableData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: CompanyUpdateFormType) => {
    const updatedData = getChangedFields(companyUpdateForm, data);

    createUser.mutate(updatedData);
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Create User"
    >
      <CompanyFormComponent
        operation="update"
        form={companyUpdateForm}
        isPending={createUser.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateCompanyModal;
