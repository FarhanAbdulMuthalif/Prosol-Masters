"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import { PrimaryTextColor } from "@/styles/colorsCode";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import "./style.scss";

export default function Home() {
  const router = useRouter();
  const MasterDetails = useContext(UseContextHook);
  const auth = UseAuth();
  if (!auth) {
    return null;
  }

  return (
    <main className="dashboard-page-wrapper">
      <div className="dashboard-page-content-view">
        <div className="dashboard-modules">
          <PersonIcon sx={{ fontSize: "2rem" }} />
          <TextComp variant="title" style={{ color: PrimaryTextColor }}>
            User Management
          </TextComp>

          <OutlinedButton className="dashboard-modules-sub-text">
            Click here
          </OutlinedButton>
          <IconButton
            aria-label="delete"
            size="small"
            className="dashboard-modules-icon-btn"
            onClick={() => {
              router.push("/UserManagement");
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className="dashboard-modules">
          <SettingsSuggestIcon sx={{ fontSize: "2rem" }} />
          <TextComp variant="title" style={{ color: PrimaryTextColor }}>
            Material Master
          </TextComp>

          <OutlinedButton
            onClick={() => {
              router.push("/Masters");
            }}
            className="dashboard-modules-sub-text"
          >
            Click here
          </OutlinedButton>

          <IconButton
            aria-label="delete"
            size="small"
            className="dashboard-modules-icon-btn"
            onClick={() => {
              router.push("/Masters");
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className="dashboard-modules">
          <WarehouseIcon sx={{ fontSize: "2rem" }} />
          <TextComp variant="title" style={{ color: PrimaryTextColor }}>
            Asset Master
          </TextComp>

          <OutlinedButton className="dashboard-modules-sub-text">
            Click here
          </OutlinedButton>
          <IconButton
            aria-label="delete"
            size="small"
            className="dashboard-modules-icon-btn"
            onClick={() => {}}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className="dashboard-modules">
          <ManageAccountsIcon sx={{ fontSize: "2rem" }} />
          <TextComp variant="title" style={{ color: PrimaryTextColor }}>
            Service Master
          </TextComp>

          <OutlinedButton className="dashboard-modules-sub-text">
            Click here
          </OutlinedButton>

          <IconButton
            aria-label="delete"
            size="small"
            className="dashboard-modules-icon-btn"
            onClick={() => {}}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      </div>
    </main>
  );
}
