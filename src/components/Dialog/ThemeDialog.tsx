"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import { PrimaryTextColor } from "@/styles/colorsCode";
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

  const { setThemeColor, ThemeColor, colorThemesArr, setReusableSnackBar } =
    ContextDataHub;
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
      if (!setReusableSnackBar) return;
      if (e?.response) {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: String(
            e?.response?.data?.message
              ? e?.response?.data?.message
              : e?.response?.data?.error
          ),
          open: true,
        }));
      } else {
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: `Error: ${e?.message}`,
          open: true,
        }));
      }
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
        <p style={{ color: PrimaryTextColor }}>Themes</p>
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
                <>
                  <div
                    className={
                      ThemeColor.name === data.name
                        ? "container-theme-box withBorder-container-theme-box"
                        : "container-theme-box"
                    }
                    onClick={() => {
                      setThemeColor(data);
                      localStorage.setItem("theme", JSON.stringify(data));
                    }}
                  >
                    <div
                      className={"container-theme-single-box"}
                      style={{
                        backgroundColor: data.primaryColor,
                        // border: ThemeColor.name === data.name ? "2px solid black" : "none",
                      }}
                    ></div>
                    <div
                      className={"container-theme-single-box"}
                      style={{
                        backgroundColor: data.secondaryColor,
                        // border: ThemeColor.name === data.name ? "2px solid black" : "none",
                      }}
                    ></div>
                    <div
                      className={"container-theme-single-box"}
                      style={{
                        backgroundColor: data.tertiaryColor,
                        // border: ThemeColor.name === data.name ? "2px solid black" : "none",
                      }}
                    ></div>
                    {ThemeColor.name === data.name ? (
                      <CheckIcon
                        sx={{
                          color: "white",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </>
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
