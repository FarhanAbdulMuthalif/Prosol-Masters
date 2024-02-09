"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import { getAllPlantData } from "@/utils/masters/plant";
import HelpIcon from "@mui/icons-material/Help";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useContext, useEffect, useState } from "react";
import api from "../api";
import "./style.scss";

export default function Header() {
  const currentRoute = usePathname();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { auth, setauth, UserInfo, setUserInfo } = useContext(UseContextHook);
  useEffect(() => {
    const fetchData = async () => {
      const dataUser = await getAllPlantData(`/user/me`);
      if (setUserInfo) {
        setUserInfo(dataUser);
      }
    };
    fetchData();
  }, [setUserInfo]);
  if (!auth) {
    return null;
  }
  const handleLogout = async () => {
    try {
      const res = await api.post("/user/auth/logout");
      if (res.status === 200) {
        setAnchorEl(null);
        localStorage.clear();
        router.push("/Login");
        if (setauth) {
          setauth(false);
        }
      }
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  return (
    <header>
      <Image
        src="/Images/prosol-logo.svg"
        className="Logo-img"
        alt="Loading...."
        width={120}
        height={45}
      />
      <Image
        src="/Images/Group.png"
        height={20}
        width={20}
        className="GroupPng-img"
        alt="Loading...."
      />
      <ul>
        <li>
          <Link
            className={
              currentRoute.split("/").includes("UserManagement")
                ? "active"
                : "in-active"
            }
            href="/UserManagement"
          >
            UserManagement
          </Link>
        </li>
        <li>
          <Link
            className={
              currentRoute.split("/").includes("Masters")
                ? "active"
                : "in-active"
            }
            href="/Masters"
          >
            Masters
          </Link>
        </li>
      </ul>

      <div className="Header-Last-Side">
        <div className="Header-Last-Side-icons">
          <NotificationsIcon sx={{ fontSize: "18px", color: "#535353" }} />
          <SettingsIcon sx={{ fontSize: "18px", color: "#535353" }} />
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
          <span>
            {UserInfo?.firstName} {UserInfo?.lastName}
          </span>

          <Image src="/Images/AdminSvg.svg" height={40} width={40} alt="Img" />
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
            sx={{ display: "flex", gap: "10px" }}
            onClick={handleLogout}
          >
            <LogoutOutlinedIcon />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}
