import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { EmployeeFormType, employeeSchema } from "../../schema/employeeSchema";
import { employeeDefaultValue } from "../../utils/employeeDefaultValue";
import EmployeeFormComponent from "../form/employeForm";

const CreateEmployeeModal = ({ factoryId }: { factoryId?: string }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const employeeForm = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employeeDefaultValue({ factoryId: factoryId }),
  });

  if (factoryId) {
    employeeForm.setValue("factoryId", factoryId);
  }

  const createFactory = useApiMutation({
    path: "auth/employee",
    method: "POST",
    onSuccess: (data) => {
      employeeForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getEmployeeData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: EmployeeFormType) => {
    const { confirmPinCode, ...rest } = data;

    createFactory.mutate({ ...rest });
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
      <EmployeeFormComponent
        selectFactory={!factoryId ? true : false}
        form={employeeForm}
        isPending={createFactory.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateEmployeeModal;
