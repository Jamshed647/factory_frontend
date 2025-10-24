import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/hooks";
import { EmployeeFormType, employeeSchema } from "../../schema/employeeSchema";
import { employeeDefaultValue } from "../../utils/employeeDefaultValue";
import EmployeeFormComponent from "../form/employeForm";

const CreateEmployeeModal = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const employeeForm = useForm<EmployeeFormType>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employeeDefaultValue(),
  });

  const createFactory = useApiMutation({
    path: "api/v1/auth/employee",
    method: "POST",
    // dataType: "multipart/form-data",
    onSuccess: (data) => {
      employeeForm.reset({});
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getEmployeeData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: EmployeeFormType) => {
    const { confirmPinCode, ...rest } = data;

    createFactory.mutate({ ...rest, factoryId: user?.factoryId });
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
        form={employeeForm}
        isPending={createFactory.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default CreateEmployeeModal;
