/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { TrashIcon } from "lucide-react";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";

const DeleteCustomerModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const deleteCustomer = useApiMutation({
    path: `auth/customer/${data?.id}`,
    method: "DELETE",
    onSuccess: (data) => {
      showToast("success", data);
      queryClient.invalidateQueries({ queryKey: ["getCustomerData"] });
    },
  });

  const handleDelete = () => {
    deleteCustomer.mutate(data);
    setOpen(false);
  };

  return (
    <DialogWrapper
      closer={false}
      triggerContent={
        <ActionButton
          icon={<TrashIcon className="w-5 h-5" />}
          handleOpen={() => console.log(data)}
        />
      }
      open={open}
      handleOpen={setOpen}
      style="p-4"
    >
      <p>Are you sure you want to delete {data.name}?</p>

      <div className="flex gap-4 justify-end mt-4">
        <ActionButton
          buttonContent="Cancel"
          type="submit"
          handleOpen={() => setOpen(false)}
        />
        <ActionButton
          buttonContent="Delete"
          type="submit"
          isPending={deleteCustomer.isPending}
          handleOpen={handleDelete}
          btnStyle=" bg-red-500 text-white"
        />
      </div>
    </DialogWrapper>
  );
};

export default DeleteCustomerModal;
