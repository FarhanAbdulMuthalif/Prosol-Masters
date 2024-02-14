"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import CheckIcon from "@mui/icons-material/Check";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useContext } from "react";
interface ThemeDialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}
export default function ThemedDialog({ open, handleClose }: ThemeDialogProps) {
  const ContextDataHub = useContext(UseContextHook);

  const { setThemeColor, ThemeColor, colorThemesArr } = ContextDataHub;
  if (!setThemeColor) return null;
  const closeHandler = () => {
    handleClose(false);
  };

  const ChangeThemeSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    closeHandler();
    try {
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ borderBottom: "1px solid #bdbdbda2", padding: "10px 16px" }}
      >
        <p style={{ color: "#6f6f6f" }}>Themes</p>
      </DialogTitle>
      <form onSubmit={ChangeThemeSubmitHandler}>
        <DialogContent
          sx={{
            padding: " 10px ",
            marginTop: "10px",
          }}
        >
          <div className="containers-themes">
            {colorThemesArr.map((data) => {
              return (
                <div
                  className="container-theme-box"
                  style={{
                    backgroundColor: data,
                    border: ThemeColor === data ? "2px solid black" : "none",
                  }}
                  onClick={() => {
                    setThemeColor(data);
                  }}
                  key={data}
                >
                  {ThemeColor === data ? (
                    <CheckIcon sx={{ color: "white" }} />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #bdbdbda2" }}>
          <OutlinedButton onClick={closeHandler}>CANCEL</OutlinedButton>
          <FillButton type="submit">APPLY</FillButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
