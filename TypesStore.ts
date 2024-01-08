type UseContextHookTypes = {
  toogleSidebar: boolean;
  auth: boolean;
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
