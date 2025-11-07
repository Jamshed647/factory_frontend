import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { SalesmanFormType, salesmanSchema } from "../../schema/salesmanSchema";
import { salesmanDefaultValue } from "../../utils/salesmanDefaultValue";
import SalesmanFormComponent from "../form/salesmanForm";

const CreateEmployeeModal = ({ factoryId }: { factoryId: string }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const employeeForm = useForm<SalesmanFormType>({
    resolver: zodResolver(salesmanSchema),
    defaultValues: salesmanDefaultValue({ factoryId: factoryId }),
  });

  if (factoryId) {
    employeeForm.setValue("factoryId", factoryId);
  }

  const createSalesman = useApiMutation({
    path: "auth/salesman",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      employeeForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getSalesmanData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: SalesmanFormType) => {
    const { confirmPinCode, ...rest } = data;

    createSalesman.mutate({ ...rest });
  };

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          btnStyle="bg-blue-500 text-white"
          icon={<Edit2Icon className="w-5 h-5" />}
          buttonContent="Create Employee"
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create Employee"
    >
      <SalesmanFormComponent
        selectFactory={!factoryId ? true : false}
        form={employeeForm}
        isPending={createSalesman.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateEmployeeModal;
