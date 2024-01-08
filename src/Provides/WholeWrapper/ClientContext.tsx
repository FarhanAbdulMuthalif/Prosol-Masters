"use client";
import Header from "@/components/Header/page";
import Navbar from "@/components/NavBar/page";
import { MuiCreateTheme } from "@/styles/MuiTheme";
import { toogleSidebarHandler } from "@/utils/sideBarFunc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useState } from "react";
import { UseContextHook } from "../UseContextHook";
import "./ClientContext.scss";

export default function ClientContext({ children }: { children: ReactNode }) {
  const [toogleSidebar, settoogleSidebar] = useState(true);
  const [auth, setauth] = useState(true);
  const ContextVal = {
    toogleSidebar,
    auth,
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
