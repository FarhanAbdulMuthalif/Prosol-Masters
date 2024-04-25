"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface EdtRoleUserListDialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  id: number;
}
export default function EdtRoleUserListDialog({
  open,
  handleClose,
  id,
}: EdtRoleUserListDialogProps) {
  const ContextDataHub = useContext(UseContextHook);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const { setReusableSnackBar, UserInfo, ThemeColor } = ContextDataHub;
  const [UserList, setUserList] = useState<
    { id: number; email: string; fullName: string }[]
  >([]);
  useEffect(() => {
    async function fetchImage() {
      if (!id) {
        setUserList([]);
        return;
      }
      try {
        const response = await api.get(`/user/getAllUsersByRoleId/${id}`);
        const data = response.data;

        setUserList(data);
      } catch (error) {
        console.error("Error fetching image:", error);
        setUserList([]); // Set to a default image on error
      }
    }

    fetchImage();
  }, [id]);

  if (!setReusableSnackBar || !UserInfo) return null;
  const closeHandler = () => {
    handleClose(false);
  };

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
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
          User List
        </TextComp>
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            padding: " 20px  0",
          }}
        >
          {UserList.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: " 5px 10px ",
                border: "1px solid #bdbdbda2",
                borderRadius: "5px",
                cursor: "pointer",
                gap: "10px",
              }}
            >
              <TextComp
                variant="subTitle"
                style={{ color: PrimaryTextColor, textTransform: "uppercase" }}
              >
                {user.fullName}
              </TextComp>
              <IconButton size="small">
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </div>
          ))}
        </div>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #bdbdbda2" }}>
        <OutlinedButton onClick={closeHandler}>CANCEL</OutlinedButton>
        <FillButton type="submit">OK</FillButton>
      </DialogActions>
    </Dialog>
  );
}
