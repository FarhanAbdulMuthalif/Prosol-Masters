"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ChangePasswordDialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}
export default function ChangePasswordDialog({
  open,
  handleClose,
}: ChangePasswordDialogProps) {
  const [ChangePasswordState, setChangePasswordState] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [ChangePasswordError, setChangePasswordError] = useState({
    currentPassword: false,
    newPassword: false,
    equal: false,
  });
  const ContextDataHub = useContext(UseContextHook);
  const { setReusableSnackBar, UserInfo } = ContextDataHub;
  if (!setReusableSnackBar || !UserInfo) return null;
  const closeHandler = () => {
    handleClose(false);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePasswordState((prev) => ({ ...prev, [name]: value }));
  };
  const ChangePasswordSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(ChangePasswordState);
    if (
      ChangePasswordState.currentPassword === ChangePasswordState.newPassword
    ) {
      setChangePasswordError((prev) => ({ ...prev, equal: true }));
      return null;
    }
    if (ChangePasswordState.currentPassword.length < 1) {
      setChangePasswordError((prev) => ({ ...prev, currentPassword: true }));
      return null;
    }
    if (ChangePasswordState.newPassword.length < 1) {
      setChangePasswordError((prev) => ({ ...prev, newPassword: true }));
      return null;
    }
    setChangePasswordError((prev) => ({
      currentPassword: false,
      newPassword: false,
      equal: false,
    }));
    try {
      const res = await api.put(
        `/user/${UserInfo.id}/changePassword`,
        ChangePasswordState
      );
      const data = await res.data;
      if (res.status === 200) {
        closeHandler();
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `The password updated successfully!`,
          open: true,
        }));
        setChangePasswordState((prev) => ({
          currentPassword: "",
          newPassword: "",
        }));
      }
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
        <TextComp
          variant="subTitle"
          style={{ color: PrimaryTextColor, textTransform: "uppercase" }}
        >
          Change Password
        </TextComp>
      </DialogTitle>
      <form onSubmit={ChangePasswordSubmitHandler}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: " 10px ",
            marginTop: "10px",
          }}
        >
          <OutlineTextField
            placeholder="Enter Currect Password"
            onChange={handleInputChange}
            value={ChangePasswordState.currentPassword}
            name="currentPassword"
            error={ChangePasswordError.currentPassword}
            helperText={
              ChangePasswordError.currentPassword
                ? " Current password should not be empty"
                : ""
            }
          />
          <OutlineTextField
            placeholder="Enter New Password"
            name="newPassword"
            value={ChangePasswordState.newPassword}
            onChange={handleInputChange}
            error={ChangePasswordError.newPassword}
            helperText={
              ChangePasswordError.newPassword
                ? " New password should not be empty"
                : ""
            }
          />
          {ChangePasswordError.equal ? (
            <TextComp
              variant="body"
              style={{ color: "red", fontWeight: "600", padding: "0 3px" }}
            >
              Current password and New Password Should be different
            </TextComp>
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #bdbdbda2" }}>
          <OutlinedButton onClick={closeHandler}>CANCEL</OutlinedButton>
          <FillButton type="submit">OK</FillButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
