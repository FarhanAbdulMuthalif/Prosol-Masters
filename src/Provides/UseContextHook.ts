import { MasterSubFieldWithData } from "@/utils/masters/plant";
import { createContext } from "react";
import { UseContextHookTypes } from "../../TypesStore";

export const UseContextHook = createContext<UseContextHookTypes>({
  userId: 0,
  auth: false,
  toogleSidebar: true,
  masters: MasterSubFieldWithData,
  colorThemesArr: [],
  ThemeColor: {
    id: 1,
    name: "default",
    primaryColor: "#1976d2",
    secondaryColor: "#614cff",
    tertiaryColor: "#e6effc",
  },
  selectedFont: "Segoe UI",
  FontsListArr: [],
});
