import { createContext } from "react";
import { UseContextHookTypes } from "../../TypesStore";

export const UseContextHook = createContext<UseContextHookTypes>({
  auth: true,
  toogleSidebar: true,
});
