"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleX, Info } from "lucide-react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { DialogWrapper } from "../../common_dialog/common_dialog";

type AlertType = "success" | "error" | "info";

interface AlertProps {
  type?: AlertType;
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  duration?: number; // auto close in ms
  resolve: (value: boolean) => void;
}

const AlertModal: React.FC<AlertProps> = ({
  type = "info",
  title,
  description,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  duration,
  resolve,
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (value: boolean) => {
    setOpen(false);
    resolve(value);
  };

  React.useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        handleClose(true);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const renderIcon = () => {
    switch (type) {
      case "error":
        return <CircleX className="w-16 h-16 text-red-600" />;
      case "success":
        return <CheckCircle2 className="w-16 h-16 text-green-600" />;
      case "info":
      default:
        return <Info className="w-16 h-16 text-blue-600" />;
    }
  };

  return (
    <DialogWrapper
      open={open}
      handleOpen={setOpen}
      closer={false}
      style="min-w-[300px] w-fit"
    >
      <div>
        <div className="flex justify-center items-center">
          <AnimatePresence>
            <motion.div
              key={type}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {renderIcon()}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="text-center"> {title && title}</p>

        <div className="py-6 text-center">{description}</div>

        <div className="flex gap-2 justify-center items-center w-full">
          {showCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleClose(false)}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
};

// Function to call like SweetAlert
export function showAlert({
  type = "info",
  title,
  description,
  confirmText,
  cancelText,
  showCancel = false,
  duration,
}: {
  type?: AlertType;
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  duration?: number;
}) {
  return new Promise<boolean>((resolve) => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    const root = createRoot(div);
    root.render(
      <AlertModal
        type={type}
        title={title}
        description={description}
        confirmText={confirmText}
        cancelText={cancelText}
        showCancel={showCancel}
        duration={duration}
        resolve={(val) => {
          resolve(val);
          setTimeout(() => {
            root.unmount();
            div.remove();
          }, 300);
        }}
      />,
    );
  });
}
