"use client";
import useFetch from "@/Hooks/useFetch";
import Header from "@/components/Header/page";
import Navbar from "@/components/NavBar/page";
import { MuiCreateTheme } from "@/styles/MuiTheme";
import { toogleSidebarHandler } from "@/utils/sideBarFunc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useState } from "react";
import { UseContextHookTypes } from "../../../TypesStore";
import { UseContextHook } from "../UseContextHook";
import "./ClientContext.scss";

export default function ClientContext({ children }: { children: ReactNode }) {
  const [toogleSidebar, settoogleSidebar] = useState(true);
  const [auth, setauth] = useState(true);
  const { data, loading, error } = useFetch("getAllPlant");
  const [PlantData, setPlantData] = useState<any[] | undefined>(data || []);

  const ContextVal: UseContextHookTypes = {
    toogleSidebar,
    auth,
    setPlantData,
    PlantData,
  };

  const iconRotateHandler = {
    transform: toogleSidebar ? "rotate(180deg)" : "",
  };

  return (
    <ThemeProvider theme={MuiCreateTheme}>
      <UseContextHook.Provider value={ContextVal}>
        <Header />
        <div className="wrapper-parent">
          <Navbar OpenSideBar={toogleSidebar} />
          <div
            className={toogleSidebar ? "icon-wrapper" : "close-icon-wrapper"}
            onClick={() => {
              settoogleSidebar(toogleSidebarHandler);
            }}
          >
            <ArrowForwardIosIcon
              style={iconRotateHandler}
              sx={{
                color: "blue",
                fontSize: "14px",
              }}
            />
          </div>
          <div className="wrapper-child">{children}</div>
        </div>
      </UseContextHook.Provider>
    </ThemeProvider>
  );
}
