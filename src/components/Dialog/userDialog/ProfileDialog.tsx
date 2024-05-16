"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { singleUserDataHandler } from "@/utils/UserDataExport";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import "./ProfileDialog.scss";

interface myProfileDialogProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
}
export default function ProfileDialog({
  open,
  handleClose,
}: myProfileDialogProps) {
  const ContextDataHub = useContext(UseContextHook);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const { setReusableSnackBar, UserInfo, ThemeColor, setUserInfo } =
    ContextDataHub;
  // const [imageSrc, setImageSrc] = useState<string>(defaultProfileImage);

  // useEffect(() => {
  //   async function fetchImage() {
  //     if (!UserInfo?.id || !UserInfo?.avatar) {
  //       setImageSrc(defaultProfileImage);
  //       return;
  //     }
  //     try {
  //       const response = await api.get(
  //         `/user/downloadFile/${UserInfo.id}/${UserInfo.avatar}`,
  //         {
  //           responseType: "blob",
  //         }
  //       );
  //       const imageBlob = response.data;
  //       const imageObjectURL = URL.createObjectURL(imageBlob);
  //       setImageSrc(imageObjectURL);
  //     } catch (error) {
  //       console.error("Error fetching image:", error);
  //       setImageSrc(defaultProfileImage); // Set to a default image on error
  //     }
  //   }

  //   fetchImage();
  // }, [UserInfo?.id, UserInfo?.avatar]);

  if (!setReusableSnackBar || !UserInfo || !setUserInfo) return null;
  const closeHandler = () => {
    handleClose(false);
  };
  const ChangeProfileHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target?.files[0] && setUserInfo) {
      const file = event?.target?.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await api.post(
          `/user/${UserInfo?.id}/picture?action=u`,
          formData
        );
        const data = await res.data;
        if (res.status === 200 || res.status === 201) {
          const lcgToken = localStorage.getItem("accessToken");

          singleUserDataHandler(lcgToken || "", setUserInfo);

          setReusableSnackBar({
            severity: "success",
            message: "Profile Updated Sucessfully",
            open: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const DeleteProfileImgHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("file", "");
      const res = await api.post(
        `/user/${UserInfo?.id}/picture?action=d`,
        formData
      );
      if (res.status === 200 || res.status === 201) {
        const lcgToken = localStorage.getItem("accessToken");
        singleUserDataHandler(lcgToken || "", setUserInfo);
        setReusableSnackBar({
          severity: "success",
          message: "Profile Deleted Sucessfully",
          open: true,
        });
      }
    } catch (error) {
      console.log(error);
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
          My Profile
        </TextComp>
      </DialogTitle>
      <form>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: " 10px ",
            marginTop: "10px",
          }}
        >
          <div className="profile-div-wrap">
            <div className="profile-details-div">
              <div
                className="profile-image-wraap"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ border: `3px solid ${ThemeColor.secondaryColor}` }}
              >
                <Image
                  src={UserInfo.avatar}
                  alt="loading..."
                  height={70}
                  width={70}
                  style={{ borderRadius: "50%", opacity: isHovered ? 0.3 : 1 }}
                  unoptimized={true} // Disable image optimization temporarily
                />
                <TextComp
                  variant="bodySmall"
                  style={{
                    color: PrimaryTextColor,
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    fontWeight: "bold",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    cursor: "pointer",
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  Change Profile
                  <BorderColorIcon
                    // fontSize="inherit"
                    sx={{
                      fontSize: "0.8rem",
                      color: ThemeColor.primaryColor,
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="update-profile-icon-input-file"
                    onChange={ChangeProfileHandler}
                    // style={{ display: "none" }}
                    // hidden
                  />
                </TextComp>
                {/* <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    cursor: "pointer",

                  }}
                >
                 
                 
                </IconButton> */}
                <IconButton
                  size="small"
                  sx={{ position: "absolute", bottom: "-3px", right: "-15px" }}
                  onClick={DeleteProfileImgHandler}
                >
                  <DeleteIcon
                    // fontSize="inherit"
                    sx={{
                      fontSize: "0.8rem",
                      color: ThemeColor.primaryColor,
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
              </div>
              <div className="profile-details-wraap">
                <TextComp variant="body" style={{ color: PrimaryTextColor }}>
                  <b>Name :</b> {UserInfo?.firstName} {UserInfo?.lastName}
                </TextComp>
                <TextComp variant="body" style={{ color: PrimaryTextColor }}>
                  <b>Email :</b> {UserInfo?.email}
                </TextComp>
                <TextComp variant="body" style={{ color: PrimaryTextColor }}>
                  <b>Phone :</b> {UserInfo?.phone}
                </TextComp>
                <TextComp variant="body" style={{ color: PrimaryTextColor }}>
                  <b>Business Name :</b> {UserInfo?.business}
                </TextComp>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #bdbdbda2" }}>
          <OutlinedButton onClick={closeHandler}>CANCEL</OutlinedButton>
          <FillButton type="submit">OK</FillButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
