"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import { PrimaryTextColor } from "@/styles/colorsCode";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import HelpIcon from "@mui/icons-material/Help";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useContext, useState } from "react";
import ThemedDialog from "../Dialog/ThemeDialog";
import ChangePasswordDialog from "../Dialog/userDialog/ChangePasswordDialog";
import ProfileDialog from "../Dialog/userDialog/ProfileDialog";
import TextComp from "../TextComp/TextComp";
import api from "../api";
import "./style.scss";

export default function Header() {
  const currentRoute = usePathname();
  const router = useRouter();
  const [ChangePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false);
  const [myProfileDialogOpen, setmyProfileDialogOpen] = useState(false);
  const [ThemeDialogOpen, setThemeDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [imageSrc, setImageSrc] = useState<string>(defaultProfileImage);
  const {
    auth,
    setauth,
    UserInfo,
    setUserInfo,
    setSelectedMasterDatatab,
    ThemeColor,
    setReusableSnackBar,
    selectedFont,
  } = useContext(UseContextHook);
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
  const [anchorElSettings, setAnchorElSettings] =
    useState<null | SVGSVGElement>(null);
  const openSetting = Boolean(anchorElSettings);
  const myPrfStyle = { display: "flex", gap: "10px" };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettingClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleSettingClose = () => {
    setAnchorElSettings(null);
  };

  const listStyles = {
    borderBottom: `3px solid ${ThemeColor.primaryColor}`,
    color: ThemeColor.primaryColor,
  };

  if (!auth || !setSelectedMasterDatatab) {
    return null;
  }
  const handleLogout = async () => {
    try {
      const res = await api.post("/user/auth/logout");
      if (res.status === 200) {
        setAnchorEl(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.push("/Login");
        if (setauth) {
          setauth(false);
          handleClose();
        }
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
    <header style={{ fontFamily: `'${selectedFont}', sans-serif` }}>
      <Image
        src="/images/prosol-logo.svg"
        className="Logo-img"
        alt="Loading...."
        width={120}
        height={45}
        priority={true}
        onClick={() => {
          router.push("/");
        }}
      />
      <Image
        src="/images/Group.svg"
        height={20}
        width={20}
        className="GroupPng-img"
        alt="Loading...."
      />
      <ul>
        <li>
          <Link
            className="active"
            style={
              currentRoute.split("/").includes("UserManagement")
                ? listStyles
                : { height: "100%" }
            }
            href="/UserManagement"
          >
            <TextComp variant="subTitle">User Management</TextComp>
          </Link>
        </li>
        <li
          onClick={() => {
            setSelectedMasterDatatab("Plant");
          }}
        >
          <Link
            className="active"
            style={
              currentRoute.split("/").includes("Masters")
                ? listStyles
                : { height: "100%" }
            }
            href="/Masters"
          >
            <TextComp variant="subTitle">Masters</TextComp>
          </Link>
        </li>
        <li>
          <Link
            className="active"
            style={
              currentRoute.split("/").includes("Settings")
                ? listStyles
                : { height: "100%" }
            }
            href="/Settings"
          >
            <TextComp variant="subTitle">Settings</TextComp>
          </Link>
        </li>
        <li>
          <Link
            className="active"
            style={
              currentRoute.split("/").includes("Dynamic")
                ? listStyles
                : { height: "100%" }
            }
            href="/Dynamic"
          >
            <TextComp variant="subTitle">Dynamic</TextComp>
          </Link>
        </li>
        <li style={{ position: "relative", overflow: "hidden" }}>
          <Link
            className="active"
            style={
              currentRoute.split("/").includes("MaterialMaster")
                ? listStyles
                : { height: "100%" }
            }
            href="/MaterialMaster"
          >
            <TextComp variant="subTitle">Material Master</TextComp>
          </Link>
        </li>
      </ul>

      <div className="Header-Last-Side">
        <div className="Header-Last-Side-icons">
          <NotificationsIcon sx={{ fontSize: "18px", color: "#535353" }} />
          <SettingsIcon
            onClick={handleSettingClick}
            sx={{ fontSize: "18px", color: "#535353" }}
          />
          <HelpIcon sx={{ fontSize: "18px", color: "#535353" }} />
        </div>
        <div
          className="Header-Last-Side-Text-img"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <TextComp variant="subTitle">
            {UserInfo?.firstName} {UserInfo?.lastName}
          </TextComp>

          <Image
            src={UserInfo?.avatar || ""}
            height={30}
            width={30}
            alt="Img"
            style={{ borderRadius: "50%" }}
            onError={(e) => {
              console.error("Error loading image:", e);
            }}
            unoptimized={true}
          />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={myPrfStyle}
            onClick={() => {
              handleClose();
              setmyProfileDialogOpen(true);
            }}
          >
            <PersonIcon sx={{ color: PrimaryTextColor, fontSize: "1.2rem" }} />
            My Profile
          </MenuItem>
          <MenuItem
            sx={myPrfStyle}
            onClick={() => {
              handleClose();
              setChangePasswordDialogOpen(true);
            }}
          >
            <LockResetIcon
              sx={{ color: PrimaryTextColor, fontSize: "1.2rem" }}
            />
            Change Password
          </MenuItem>
          <MenuItem sx={myPrfStyle} onClick={handleLogout}>
            <LogoutOutlinedIcon
              sx={{ color: PrimaryTextColor, fontSize: "1.2rem" }}
            />
            Logout
          </MenuItem>
        </Menu>
        <Menu
          id="basic-menu"
          anchorEl={anchorElSettings}
          open={openSetting}
          onClose={handleSettingClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            sx={myPrfStyle}
            onClick={() => {
              setThemeDialogOpen(true);
              handleSettingClose();
            }}
          >
            <ColorLensIcon
              sx={{ color: PrimaryTextColor, fontSize: "1.2rem" }}
            />
            Themes
          </MenuItem>
        </Menu>
        <ChangePasswordDialog
          open={ChangePasswordDialogOpen}
          handleClose={setChangePasswordDialogOpen}
        />
        <ProfileDialog
          open={myProfileDialogOpen}
          handleClose={setmyProfileDialogOpen}
        />
        <ThemedDialog open={ThemeDialogOpen} handleClose={setThemeDialogOpen} />
      </div>
    </header>
  );
}
