"use client";
import UseAuth from "@/Hooks/useAuth";
import Header from "@/components/Header/page";
import Navbar from "@/components/NavBar/page";
import { MuiCreateTheme } from "@/styles/MuiTheme";
import { MasterSubFieldWithData, getAllPlantData } from "@/utils/masters/plant";
import { toogleSidebarHandler } from "@/utils/sideBarFunc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { UseContextHookTypes } from "../../../TypesStore";
import { UseContextHook } from "../UseContextHook";
import "./ClientContext.scss";

export default function ClientContext({ children }: { children: ReactNode }) {
  const [toogleSidebar, settoogleSidebar] = useState(true);
  const [auth, setauth] = useState(false);
  const [editTabShow, seteditTabShow] = useState(true);
  const [PlantData, setPlantData] = useState<any[] | undefined>([]);
  const [SelectedMasterDatatab, setSelectedMasterDatatab] = useState("Plant");
  const [tabValue, settabValue] = useState<"table" | "edit" | "create">(
    "table"
  );
  useEffect(() => {
    const fetchData = async () => {
      const dataPlant = await getAllPlantData(`/plant/getAllPlant`);
      setPlantData(dataPlant);
    };
    fetchData();
  }, []);

  const ContextVal: UseContextHookTypes = {
    toogleSidebar,
    auth,
    setPlantData,
    PlantData,
    masters: MasterSubFieldWithData,
    setSelectedMasterDatatab,
    SelectedMasterDatatab,
    tabValue,
    settabValue,
    setauth,
    seteditTabShow,
    editTabShow,
  };

  const iconRotateHandler = {
    transform: toogleSidebar ? "rotate(180deg)" : "",
  };
  const authHook = UseAuth();

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
