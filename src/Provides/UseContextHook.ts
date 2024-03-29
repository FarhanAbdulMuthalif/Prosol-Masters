import { initialFontProperty } from "@/utils/Theme/themeData";
import { MasterSubFieldWithData } from "@/utils/masters/plant";
import { createContext } from "react";
import {
  SingleThemeObjProps,
  UseContextHookTypes,
  fontPropertyProps,
} from "../../TypesStore";
const lcsValueFontProperty =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("fontProperty")
    : null;
const lcsValueTheme =
  typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
const initialTimeFontLoadFunc = () => {
  if (lcsValueFontProperty) {
    return JSON?.parse(lcsValueFontProperty);
  } else {
    return initialFontProperty;
  }
};
const initialTimeFontLoad: fontPropertyProps[] = initialTimeFontLoadFunc();
const initialTimeThemeLoadFunc = () => {
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
};
const initialTimeThemeLoad: SingleThemeObjProps = initialTimeThemeLoadFunc();

export const UseContextHook = createContext<UseContextHookTypes>({
  userId: 0,
  auth: false,
  toogleSidebar: true,
  masters: MasterSubFieldWithData,
  colorThemesArr: [],
  fontPropertyArr: initialTimeFontLoad,
  ThemeColor: initialTimeThemeLoad,
  selectedFont: "Segoe UI",
  FontsListArr: [],
  incoming: [],
  outgoing: [],
  SelectedMasterDatatab: "Plant",
});
