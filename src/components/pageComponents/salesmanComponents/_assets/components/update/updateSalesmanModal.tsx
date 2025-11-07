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
import SalesmanFormComponent from "../form/salesmanForm";
import {
  SalesmanUpdateFormType,
  salesmanUpdateSchema,
} from "../../schema/salesmanSchema";
import { salesmanDefaultValue } from "../../utils/salesmanDefaultValue";

const UpdateSalesmanModal = ({ data }: { data: any }) => {
  console.log(data);
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const companyUpdateForm = useForm<SalesmanUpdateFormType>({
    resolver: zodResolver(salesmanUpdateSchema),
    defaultValues: salesmanDefaultValue(data),
  });

  const updateSalesman = useApiMutation({
    path: `auth/salesman/${data.id}`,
    method: "PATCH",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getSalesmanData"] });
      setOpen(false);
    },
  });

  const onSubmit = async (data: SalesmanUpdateFormType) => {
    updateSalesman.mutate(data);
  };

  return (
    <DialogWrapper
      triggerContent={<ActionButton icon={<Edit2Icon className="w-5 h-5" />} />}
      open={open}
      handleOpen={setOpen}
      title="Update Factory"
    >
      <SalesmanFormComponent
        operation="update"
        form={companyUpdateForm}
        isPending={updateSalesman?.isPending}
        onSubmit={onSubmit}
      />
    </DialogWrapper>
  );
};

export default UpdateSalesmanModal;
