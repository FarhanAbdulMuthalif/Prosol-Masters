"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import { PrimaryTextColor } from "@/styles/colorsCode";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

import { iconWrapperAsseteMaster } from "@/components/Icons/AsseteMasterIcon";
import { iconWrapperServiceMaster } from "@/components/Icons/ServiceMasterIcon";
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
  const serviceMasterIconColor =
    isHovered > 0 ? `${ThemeColor.primaryColor}` : PrimaryTextColor;
  const dashboardModuleStyle = {
    color: isHovered > 0 ? `${ThemeColor.primaryColor}` : "",
    border: isHovered > 0 ? `1px solid ${ThemeColor.primaryColor}` : "none",

    transition: "border 0.3s",
  };

  // const iconWrapperServiceMaster = () => {
  //   return (
  //     <div className="icon-wrapper-service-master-icon">
  //       <SettingsIcon sx={{ fontSize: "3rem" }} />
  //       <HandymanIcon
  //         sx={{
  //           fontSize: "1rem",
  //           position: "absolute",
  //           top: "50%",
  //           left: "50%",
  //           transform: "translate(-50%,-50%)",
  //         }}
  //       />
  //     </div>
  //   );
  // };
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
      icon: iconWrapperAsseteMaster(serviceMasterIconColor),
      text: "Asset Master",
      link: "",
    },
    {
      id: 4,
      icon: iconWrapperServiceMaster(serviceMasterIconColor),
      text: "Service Master",
      link: "",
    },
  ];
  return (
    <main className="dashboard-page-wrapper">
      <div className="dashboard-page-content-view">
        {dashboardTabdsArr.map((data) => {
          // Calculate the color of the icon for this specific tab
          const iconColor =
            isHovered === data.id
              ? `${ThemeColor.primaryColor}`
              : PrimaryTextColor;

          // Calculate the style for this specific tab
          const moduleStyle = {
            color: isHovered === data.id ? `${ThemeColor.primaryColor}` : "",
            border:
              isHovered === data.id
                ? `1px solid ${ThemeColor.primaryColor}`
                : "none",
            transition: "border 0.3s",
          };
          return (
            <div
              className="dashboard-modules"
              style={moduleStyle}
              onMouseEnter={() => {
                handleMouseEnter(data.id);
              }}
              onMouseLeave={handleMouseLeave}
              key={data.id}
            >
              {data.id === 3
                ? iconWrapperAsseteMaster(iconColor)
                : data.id === 4
                ? iconWrapperServiceMaster(iconColor)
                : data.icon}
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
