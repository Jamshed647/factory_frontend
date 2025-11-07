/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { TrashIcon } from "lucide-react";

const DeleteCompanyModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);

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
          // isPending={deleteCompany.isPending}
          handleOpen={() => console.log("Submitted")}
          btnStyle=" bg-red-500 text-white"
        />
      </div>
    </DialogWrapper>
  );
};

export default DeleteCompanyModal;
