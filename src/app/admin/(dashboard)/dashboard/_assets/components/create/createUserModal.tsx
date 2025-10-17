import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import CreateUser from "./createUserForm";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";

const CreateUserModal = () => {
  const [open, setOpen] = React.useState(false);

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
      <CreateUser />
    </DialogWrapper>
  );
};

export default CreateUserModal;
