import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface ReusableConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ReusableConfirmationDialog: FC<ReusableConfirmationDialogProps> = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle
        sx={{
          borderBottom: " 0.5px solid #e3e6ea",
          padding: "10px",
        }}
      >
        <p style={{ color: "brown", fontSize: "18px" }}>{title}</p>
      </DialogTitle>
      <DialogContent sx={{ color: "#6f6f6f" }}>
        <Typography sx={{ padding: "10px" }}>{content}</Typography>
      </DialogContent>
      <DialogActions sx={{ borderTop: " 0.5px solid #e3e6ea", padding: "5px" }}>
        <Button onClick={onCancel} variant="outlined">
          No
        </Button>
        <Button onClick={onConfirm} variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableConfirmationDialog;
