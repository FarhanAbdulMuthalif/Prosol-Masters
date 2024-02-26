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
      name: "Title",
      defaultSize: 14,
      fontWeight: "bold",
    },
    {
      id: 2,
      name: "Sub Title",
      defaultSize: 12,
      fontWeight: "500",
    },
    {
      id: 3,
      name: "Body",
      defaultSize: 12,
      fontWeight: "regular",
    },
    {
      id: 4,
      name: "Body Small",
      defaultSize: 10,
      fontWeight: "regular",
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
