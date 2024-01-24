"use client";
import HelpIcon from "@mui/icons-material/Help";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UseAuth from "@/Hooks/useAuth";
import "./style.scss";

export default function Header() {
  const currentRoute = usePathname();
  // console.log(currentRoute + "from navbar");

  // const CurrentView = pathObj[currentRoute.slice(1) as keyof PathObjProps] ?? [
  //   { name: "Plant", path: "/Masters" },
  //   { name: "General", path: "/Masters/General" },
  //   { name: "MRPData", path: "/Masters/MRPData" },
  //   // { name: "Sales & others", path: "/Masters/SalesAndOthers" },
  // ];
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
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
        <div className="Header-Last-Side-Text-img">
          <span>Super Admin</span>
          <Image src="/Images/AdminSvg.svg" height={40} width={40} alt="Img" />
        </div>
      </div>
    </header>
  );
}
