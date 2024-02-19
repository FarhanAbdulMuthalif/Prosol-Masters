"use client";
import UseAuth from "@/Hooks/useAuth";
import Header from "@/components/Header/page";
import Navbar from "@/components/NavBar/page";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import { MuiCreateTheme } from "@/styles/MuiTheme";
import { MasterSubFieldWithData, getAllPlantData } from "@/utils/masters/plant";
import { toogleSidebarHandler } from "@/utils/sideBarFunc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import {
  SingleThemeObjProps,
  SingleUserInfoProps,
  SnackBarReusableProps,
  UseContextHookTypes,
} from "../../../TypesStore";
import { UseContextHook } from "../UseContextHook";
import "./ClientContext.scss";

export default function ClientContext({ children }: { children: ReactNode }) {
  const [toogleSidebar, settoogleSidebar] = useState(true);
  const [userId, setuserId] = useState(0);
  const [UserInfo, setUserInfo] = useState<SingleUserInfoProps>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    phone: 0,
    business: "",
    departmentId: 0,
    plantId: [],
    status: true,
    roles: [],
  });
  const [auth, setauth] = useState(false);
  const [editTabShow, seteditTabShow] = useState(true);
  const [PlantData, setPlantData] = useState<any[] | undefined>([]);
  const [SelectedMasterDatatab, setSelectedMasterDatatab] = useState("Plant");
  const lcsValu =
    typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
  const [ThemeColor, setThemeColor] = useState<SingleThemeObjProps>(() => {
    if (lcsValu) {
      return JSON.parse(lcsValu);
    } else {
      return {
        id: 1,
        name: "default",
        primaryColor: "#1976d2",
        secondaryColor: "#614cff",
        tertiaryColor: "#e6effc",
      };
    }
  });
  const [tabValue, settabValue] = useState<"table" | "edit" | "create">(
    "table"
  );
  const colorThemesArr = [
    {
      id: 1,
      name: "default",
      primaryColor: "#1976d2",
      secondaryColor: "#614cff",
      tertiaryColor: "#e6effc",
    },
    {
      id: 2,
      name: "light",
      primaryColor: "#CE5A67",
      secondaryColor: "#F4BF96",
      tertiaryColor: "#FCF5ED",
    },
    {
      id: 3,
      name: "dark",
      primaryColor: "#4F6F52",
      secondaryColor: "#86A789",
      tertiaryColor: "#D2E3C8",
    },
    {
      id: 4,
      name: "shinePupule",
      primaryColor: "#070F2B",
      secondaryColor: "#535C91",
      tertiaryColor: "#9290C3",
    },
    {
      id: 5,
      name: "shineOrange",
      primaryColor: "#454545",
      secondaryColor: "#FF6000",
      tertiaryColor: "#FFE6C7",
    },
    {
      id: 6,
      name: "lotusTheme",
      primaryColor: "black",
      secondaryColor: "white",
      tertiaryColor: "#fad757",
    },
  ];
  const [ReusableSnackBar, setReusableSnackBar] =
    useState<SnackBarReusableProps>({
      open: false,
      message: "",
      severity: "success",
    });
  useEffect(() => {
    const fetchData = async () => {
      const dataPlant = await getAllPlantData(`/plant/getAllPlant`);
      setPlantData(dataPlant);
    };
    if (auth) {
      fetchData();
    }
  }, [auth]);

  const ContextVal: UseContextHookTypes = {
    UserInfo,
    setUserInfo,
    setuserId,
    userId,
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
    setReusableSnackBar,
    colorThemesArr,
    ThemeColor,
    setThemeColor,
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
          {auth ? (
            <div
              className={toogleSidebar ? "icon-wrapper" : "close-icon-wrapper"}
              onClick={() => {
                settoogleSidebar(toogleSidebarHandler);
              }}
            >
              <ArrowForwardIosIcon
                style={iconRotateHandler}
                sx={{
                  color: ThemeColor.primaryColor,
                  fontSize: "14px",
                }}
              />
            </div>
          ) : (
            ""
          )}

          <div className="wrapper-child">{children}</div>
        </div>
        <ReusableSnackbar
          message={ReusableSnackBar.message}
          severity={ReusableSnackBar.severity}
          setOpen={setReusableSnackBar}
          open={ReusableSnackBar.open}
        />
      </UseContextHook.Provider>
    </ThemeProvider>
  );
}
