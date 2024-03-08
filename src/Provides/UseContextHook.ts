import { MasterSubFieldWithData } from "@/utils/masters/plant";
import { createContext } from "react";
import { UseContextHookTypes } from "../../TypesStore";

export const UseContextHook = createContext<UseContextHookTypes>({
  userId: 0,
  auth: false,
  toogleSidebar: true,
  masters: MasterSubFieldWithData,
  colorThemesArr: [],
  fontPropertyArr: [
    {
      id: 1,
      fontFormat: "title",
      fontSize: 14,
      fontWeight: "bold",
    },
    {
      id: 2,
      fontFormat: "subTitle",
      fontSize: 12,
      fontWeight: "600",
    },
    {
      id: 3,
      fontFormat: "body",
      fontSize: 12,
      fontWeight: "normal",
    },
    {
      id: 4,
      fontFormat: "bodySmall",
      fontSize: 10,
      fontWeight: "normal",
    },
  ],
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
