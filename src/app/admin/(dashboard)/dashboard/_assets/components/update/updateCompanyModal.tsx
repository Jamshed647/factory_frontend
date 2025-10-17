/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import React from "react";
import ActionButton from "@/components/common/button/actionButton";
import { Edit2Icon } from "lucide-react";
import CompanyFormComponent from "../form/companyForm";

const UpdateCompanyModal = ({ data }: { data: any }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DialogWrapper
      triggerContent={
        <ActionButton
          icon={<Edit2Icon className="w-5 h-5" />}
          handleOpen={() => console.log(data)}
        />
      }
      open={open}
      handleOpen={setOpen}
      title="Create User"
    >
      <CompanyFormComponent data={data} />
    </DialogWrapper>
  );
};

export default UpdateCompanyModal;
