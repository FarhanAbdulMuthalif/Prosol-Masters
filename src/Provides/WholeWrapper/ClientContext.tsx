"use client";
import Header from "@/components/Header/page";
import Navbar from "@/components/NavBar/page";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import MUIThemeComp from "@/styles/MUIThemeComp";
import {
  FontsListArr,
  colorThemesArr,
  initialFontProperty,
} from "@/utils/Theme/themeData";
import { MasterSubFieldWithData, getAllPlantData } from "@/utils/masters/plant";
import { toogleSidebarHandler } from "@/utils/sideBarFunc";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import {
  PostCreateFieldData,
  SingleThemeObjProps,
  SingleUserInfoProps,
  SnackBarReusableProps,
  UseContextHookTypes,
  fontPropertyProps,
  selectedNodeTypeProps,
} from "../../../TypesStore";
import { UseContextHook } from "../UseContextHook";
import "./ClientContext.scss";

export default function ClientContext({ children }: { children: ReactNode }) {
  const [toogleSidebar, settoogleSidebar] = useState(true);
  const [userId, setuserId] = useState(0);
  const [SelectedNodeData, setSelectedNodeData] =
    useState<selectedNodeTypeProps>({ incoming: [], outgoing: [] });
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
    avatar: "",
  });
  const [auth, setauth] = useState(false);
  const [editTabShow, seteditTabShow] = useState(true);
  const [SelectedFormFields, setSelectedFormFields] = useState<
    PostCreateFieldData[]
  >([]);
  const [PlantData, setPlantData] = useState<any[] | undefined>([]);
  const [SelectedMasterDatatab, setSelectedMasterDatatab] = useState("Plant");
  const lcsValueTheme =
    typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
  const [ThemeColor, setThemeColor] = useState<SingleThemeObjProps>(() => {
    if (lcsValueTheme) {
      return JSON?.parse(lcsValueTheme);
    } else {
      return {
        id: 1,
        name: "default",
        primaryColor: "#1976d2",
        secondaryColor: "#1669bb",
        tertiaryColor: "#d1e3f6",
      };
    }
  });
  const lcsValueFontProperty =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("fontProperty")
      : null;
  const [fontPropertyArr, setfontPropertyArr] = useState<fontPropertyProps[]>(
    () => {
      if (lcsValueFontProperty) {
        return JSON?.parse(lcsValueFontProperty);
      } else {
        return initialFontProperty;
      }
    }
  );
  const lcsValueFont =
    typeof localStorage !== "undefined" ? localStorage.getItem("font") : null;
  const [tabValue, settabValue] = useState<"table" | "edit" | "create">(
    "table"
  );
  const [selectedFont, setselectedFont] = useState(() => {
    if (lcsValueFont) {
      return JSON.parse(lcsValueFont);
    } else {
      return "Segoe UI";
    }
  });

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
    selectedFont,
    setselectedFont,
    FontsListArr,
    fontPropertyArr,
    setfontPropertyArr,
    setSelectedNodeData,
    incoming: SelectedNodeData.incoming,
    outgoing: SelectedNodeData.outgoing,
    setSelectedFormFields,
    SelectedFormFields,
  };
  const iconRotateHandler = {
    transform: toogleSidebar ? "rotate(180deg)" : "",
  };
  const dataTheme = MUIThemeComp(selectedFont, ThemeColor);

  return (
    <ThemeProvider theme={dataTheme}>
      <UseContextHook.Provider value={ContextVal}>
        <Header />
        <div
          className="wrapper-parent"
          style={{ fontFamily: `'${selectedFont}', sans-serif` }}
        >
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
