import { Dialog, DialogContent } from "@mui/material";
import { FC } from "react";

interface ReusableSimpleImageDialogProps {
  open: boolean;

  onCancel: () => void;
}

const ReusableSimpleImageDialog: FC<ReusableSimpleImageDialogProps> = ({
  open,

  onCancel,
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default ReusableSimpleImageDialog;
