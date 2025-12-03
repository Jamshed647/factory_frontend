import { useApiMutation } from "@/app/utils/TanstackQueries/useApiMutation";
import { DialogWrapper } from "@/components/common/common_dialog/common_dialog";
import { showToast } from "@/components/common/TostMessage/customTostMessage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { EditIcon, Save } from "lucide-react";
import { useState } from "react";

const EditCashNote = ({ note, cashId }: { note: string; cashId: string }) => {
  const [open, setOpen] = useState(false);
  const [updateNote, setUpdateNote] = useState(note);
  const queryClient = useQueryClient();

  const submitNote = useApiMutation({
    path: `factory/cash/history/${cashId}`,
    method: "PATCH",
    onSuccess: (data) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["getCashDataByFactory"] });
      queryClient.invalidateQueries({
        queryKey: ["getCashDataByFactoryDashboard"],
      });
      showToast("success", data);
    },
  });

  const handleSave = () => {
    submitNote.mutate({
      note: updateNote,
    });
  };

  return (
    <DialogWrapper
      title="Edit Cash Note"
      open={open}
      handleOpen={setOpen}
      triggerContent={
        <EditIcon className="w-4 h-4 text-emerald-600 cursor-pointer" />
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="note">Transaction Note</Label>
          <Textarea
            id="note"
            placeholder="Enter note about this transaction..."
            value={updateNote}
            onChange={(e) => setUpdateNote(e.target.value)}
            className="focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button
          disabled={submitNote.isPending}
          onClick={handleSave}
          className="w-full text-white bg-blue-500 cursor-pointer hover:bg-blue-300"
        >
          <Save className="w-4 h-4" />
          Save Note
        </Button>
      </div>
    </DialogWrapper>
  );
};

export default EditCashNote;
