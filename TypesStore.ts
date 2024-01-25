import { Dispatch, SetStateAction } from "react";

export type UseContextHookTypes = {
  toogleSidebar: boolean;
  auth: boolean;
  setPlantData?: Dispatch<SetStateAction<any[] | undefined>>; // Adjust the type here
  PlantData?: any[] | undefined; // Adjust the type here
  masters: mastersProps;
  SelectedMasterDatatab?: string;
  setSelectedMasterDatatab?: Dispatch<SetStateAction<string>>;
  tabValue?: "table" | "edit" | "create";
  settabValue?: Dispatch<SetStateAction<"table" | "edit" | "create">>;
  setauth?: (val: boolean) => void;
  seteditTabShow?: (val: boolean) => void;
  editTabShow?: boolean;
};
export type NavKeyType = {
  [key in string]: NavSinData[];
};
type NavSinData = {
  name: string;
  path: string;
};
export type MasterNavBarDataRenderTypes = {
  Plant: subSecondNavbarType[];
  General: subSecondNavbarType[];
  MRPData: subSecondNavbarType[];
};
export type subSecondNavbarType = { name: string; path: string };

export type mastersProps = {
  Plant: mastersPlantSubFields;
  General: mastersPlantSubFields; //need to change
  MRPData: mastersPlantSubFields; //need to change
};

export type mastersPlantSubFields = {
  Plant: mastersSubsubFields;
  ProfitCenter: mastersSubsubFields;
  PriceControl: mastersSubsubFields;
  StorageBin: mastersSubsubFields;
  StorageLocation: mastersSubsubFields;
  ValuationClass: mastersSubsubFields;
  ValuationCategory: mastersSubsubFields;
  VarianceKey: mastersSubsubFields;
  Department: mastersSubsubFields;
};

export type mastersSubsubFields = {
  getAll: string;
  getSingle: string;
  create: string;
  createBulk: string;
  updateStatus: string;
  updateBulkStatus: string;
  template: string;
  exportPdf: string;
  exportExcel: string;
  delete: string;
  deleteBulk: string;
  update: string;
  includePlantDropdown: boolean;
};
export type ValidMasterDataTabs = "Plant" | "ProfitCenter" | "PriceControl";
export interface PostCreateFieldData {
  id?: number;
  dataType: string;
  identity?: string;
  fieldName: string;
  pattern?: string[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  extraField?: boolean;
  readable?: boolean;
  writable?: boolean;
  showAsColumn?: boolean;
  enums?: string[];
  required: boolean;
  dropDowns?: Option[];
}
export interface Option {
  id?: string;
  value: string;
}
export type PathObjProps = {
  Masters: { name: string; path: string }[];
  UserManagement: { name: string; path: string }[];
};
export type UserInitialStateProps = {
  id?: number;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  business: string;
  departmentId: number;
  plantId: number[];
  status: boolean;
  roles: any[];
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};
export type RoleInitialStateProps = {
  id?: number;
  name: string;
  description: string;
  plantId: number;
  status: boolean;
  privileges: number[];
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};
