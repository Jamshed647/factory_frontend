import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/custom_ui/dialog";
import { ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface DialogWrapperProps {
  style?: string;
  open: boolean;
  handleOpen: (open: boolean) => void;
  triggerContent?: ReactNode;
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  closer?: boolean;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  handleOpen,
  triggerContent,
  title,
  description,
  children,
  closer = true,
  style,
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{triggerContent}</DialogTrigger>

      <DialogContent forceMount className={style}>
        {/* Only ONE DialogTitle total */}
        {title ? (
          <DialogTitle className="hidden">{title}</DialogTitle>
        ) : (
          <VisuallyHidden>
            <DialogTitle>Dialog</DialogTitle>
          </VisuallyHidden>
        )}

        {/* Optional Header (no DialogTitle inside here!) */}
        {closer && (
          <DialogHeader
            className={`capitalize bg-background ${
              title ? "py-5 px-2 bg-background border-b" : "pt-2 bg-transparent"
            }`}
          >
            {/* Just a span for visual layout — not DialogTitle */}
            {title && <span className="text-lg font-semibold">{title}</span>}
            {description && (
              <DialogDescription className="hidden">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {/* Main Body */}
        <div className="p-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
/** Usage==>
 * - Uses controlled open/close with `open` and `handleOpen`.
 * - `triggerContent` is the element that opens the dialog.
 * - `title` and `description` show a header if provided.
 * - `children` is the main content inside the dialog.
 * - `closer` shows or hides the dialog header (default: true).
 * - `style` allows custom styling for the dialog content.
 */
