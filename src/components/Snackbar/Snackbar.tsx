import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
interface ReusableSnackbarProps {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  open: boolean;
  setOpen: (val: boolean) => void;
}

const ReusableSnackbar = ({
  open,
  setOpen,
  message,
  severity = "success",
}: ReusableSnackbarProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={severity} variant="filled" elevation={6}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ReusableSnackbar;
