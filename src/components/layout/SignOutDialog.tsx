import { useState } from "react";
import { DialogWrapper } from "../common/common_dialog/common_dialog";
import ActionButton from "../common/button/actionButton";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/hooks";
interface SignOutDialogProps {
  collapsed: boolean;
}

const SignOutConfirmation = ({ collapsed }: SignOutDialogProps) => {
  const { signout, isSignoutLoading } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <DialogWrapper
      closer={true}
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <ActionButton
          btnStyle="w-full bg-red-500 text-white"
          icon={<LogOut size={18} />}
          buttonContent={collapsed ? "" : "Logout"}
          tooltipContent={!collapsed ? "" : "Logout"}
          variant="ghost"
          isPending={isSignoutLoading}
        />
      }
      style="w-[30%] py-4"
    >
      <p>Are you sure you want to sign out?</p>
      <div className="flex gap-2 justify-end mt-10">
        <ActionButton
          buttonContent="Stay signed in"
          type="button"
          variant="ghost"
          handleOpen={() => setOpen(false)}
          btnStyle="w-full bg-blue-500 text-white"
        />
        <ActionButton
          type="submit"
          btnStyle="w-full bg-red-500 text-white"
          icon={<LogOut size={18} />}
          buttonContent="Sign out"
          handleOpen={() => signout()}
          isPending={isSignoutLoading}
        />
      </div>
    </DialogWrapper>
  );
};

export default SignOutConfirmation;
