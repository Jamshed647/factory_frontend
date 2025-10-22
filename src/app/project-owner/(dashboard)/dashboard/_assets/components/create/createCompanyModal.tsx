import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import CompanyFormComponent from "../form/companyForm";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDefaultValue } from "../../utils/companyDefaultValue";
import { useForm } from "react-hook-form";
import { CompanyFormType, companySchema } from "../../schema/companySchema";
import { useQueryClient } from "@tanstack/react-query";

const CreateUserModal = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyForm = useForm<CompanyFormType>({
    resolver: zodResolver(companySchema),
    defaultValues: companyDefaultValue(),
  });

  const createUser = useApiMutation({
    path: "api/v1/auth/company",
    method: "POST",
    onSuccess: (data) => {
      companyForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCompanyData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: CompanyFormType) => {
    const { confirmPinCode, ...cleanData } = data;

    createUser.mutate(cleanData);
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Company"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create User"
    >
      <CompanyFormComponent
        form={companyForm}
        isPending={createUser.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateUserModal;
