import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Dispatch, SetStateAction } from "react";
import { SnackBarReusableProps } from "../../../TypesStore";
interface ReusableSnackbarProps {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  open: boolean;
  setOpen: Dispatch<SetStateAction<SnackBarReusableProps>>;
}

const ReusableSnackbar = ({
  open,
  setOpen,
  message,
  severity = "success",
}: ReusableSnackbarProps) => {
  const handleClose = () => {
    setOpen((prev) => ({ ...prev, open: false }));
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
