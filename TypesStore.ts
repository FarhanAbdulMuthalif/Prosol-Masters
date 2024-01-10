import { Dispatch, SetStateAction } from "react";

export type UseContextHookTypes = {
  toogleSidebar: boolean;
  auth: boolean;
  setPlantData?: Dispatch<SetStateAction<any[] | undefined>>; // Adjust the type here
  PlantData?: any[] | undefined; // Adjust the type here
};
type NavKeyType = {
  [key in string]: NavSinData[];
};
type NavSinData = {
  name: string;
  path: string;
};
type MasterNavBarDataRenderTypes = {
  Plant: subSecondNavbarType[];
  General: subSecondNavbarType[];
  MRPData: subSecondNavbarType[];
};
type subSecondNavbarType = { name: string; path: string };
