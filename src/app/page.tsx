"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import { PrimaryTextColor } from "@/styles/colorsCode";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import "./style.scss";

export default function Home() {
  const router = useRouter();
  const ContextDataHub = useContext(UseContextHook);
  const { ThemeColor } = ContextDataHub;
  const [isHovered, setIsHovered] = useState(0);
  const handleMouseEnter = (id: number) => {
    setIsHovered(id);
  };
  const handleMouseLeave = () => {
    setIsHovered(0);
  };
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  const dashboardModuleStyle = {
    color: isHovered > 0 ? `${ThemeColor.primaryColor}` : "",
    border: isHovered > 0 ? `1px solid ${ThemeColor.primaryColor}` : "none",

    transition: "border 0.3s",
  };
  const dashboardTabdsArr = [
    {
      id: 1,
      icon: <PersonIcon sx={{ fontSize: "2rem" }} />,
      text: "User Management",
      link: "/UserManagement",
    },
    {
      id: 2,
      icon: <SettingsSuggestIcon sx={{ fontSize: "2rem" }} />,
      text: "Material Master",
      link: "/Masters",
    },
    {
      id: 3,
      icon: <WarehouseIcon sx={{ fontSize: "2rem" }} />,
      text: "Asset Master",
      link: "",
    },
    {
      id: 4,
      icon: <ManageAccountsIcon sx={{ fontSize: "2rem" }} />,
      text: "Service Master",
      link: "",
    },
  ];
  return (
    <main className="dashboard-page-wrapper">
      <div className="dashboard-page-content-view">
        {dashboardTabdsArr.map((data) => {
          return (
            <div
              className="dashboard-modules"
              style={isHovered === data.id ? dashboardModuleStyle : {}}
              onMouseEnter={() => {
                handleMouseEnter(data.id);
              }}
              onMouseLeave={handleMouseLeave}
              key={data.id}
            >
              {data.icon}
              <TextComp variant="title" style={{ color: PrimaryTextColor }}>
                {data.text}
              </TextComp>
              <OutlinedButton
                onClick={() => {
                  router.push(data.link);
                }} /*  className="dashboard-modules-sub-text" */
              >
                Click here
              </OutlinedButton>
            </div>
          );
        })}
      </div>
    </main>
  );
}
