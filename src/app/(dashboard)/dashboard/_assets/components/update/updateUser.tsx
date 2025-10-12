/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Modal } from "antd";
import { Edit } from "lucide-react";

const UpdateUser = ({ info }: any) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const onSubmit = () => {
    console.log("Submitted:");
  };

  return (
    <>
      <Button style={{ height: "40px" }} onClick={() => setOpen(true)}>
        <Edit size={16} strokeWidth={3} />
      </Button>
      <Modal
        title={<p>Update User</p>}
        footer={
          <Button type="primary" onClick={() => onSubmit()}>
            Submit
          </Button>
        }
        // loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Some contents...{info.name}</p>
        <p>Some contents...{info.email}</p>
      </Modal>
    </>
  );
};

export default UpdateUser;
