import { MasterSubFieldWithData } from "@/utils/masters/plant";
import { createContext } from "react";
import { UseContextHookTypes } from "../../TypesStore";

export const UseContextHook = createContext<UseContextHookTypes>({
  userId: 0,
  auth: false,
  toogleSidebar: true,
  masters: MasterSubFieldWithData,
  colorThemesArr: ["#739072", "#B47B84", "#535C91", "#F4BF96", "#1976d2"],
  ThemeColor: "#1976d2",
});
