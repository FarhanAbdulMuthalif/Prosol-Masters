import { Dispatch, SetStateAction } from "react";

export type UseContextHookTypes = {
  userId: number;
  toogleSidebar: boolean;
  auth: boolean;
  setUserInfo?: Dispatch<SetStateAction<SingleUserInfoProps>>;
  UserInfo?: SingleUserInfoProps;
  setuserId?: (val: number) => void;
  setPlantData?: Dispatch<SetStateAction<any[] | undefined>>; // Adjust the type here
  PlantData?: any[] | undefined; // Adjust the type here
  masters: mastersProps;
  SelectedMasterDatatab: string;
  setSelectedMasterDatatab?: Dispatch<SetStateAction<string>>;
  tabValue?: "table" | "edit" | "create";
  settabValue?: Dispatch<SetStateAction<"table" | "edit" | "create">>;
  setauth?: (val: boolean) => void;
  seteditTabShow?: (val: boolean) => void;
  editTabShow?: boolean;
  setReusableSnackBar?: Dispatch<SetStateAction<SnackBarReusableProps>>;
  colorThemesArr: SingleThemeObjProps[];
  ThemeColor: SingleThemeObjProps;
  setThemeColor?: Dispatch<SetStateAction<SingleThemeObjProps>>;
  setselectedFont?: Dispatch<SetStateAction<string>>;
  selectedFont: string;
  FontsListArr: string[];
  fontPropertyArr: fontPropertyProps[];
  setfontPropertyArr?: Dispatch<SetStateAction<fontPropertyProps[]>>;
  incoming: string[];
  outgoing: string[];
  setSelectedNodeData?: Dispatch<SetStateAction<selectedNodeTypeProps>>;
  setSelectedFormFields?: Dispatch<SetStateAction<PostCreateFieldData[]>>;
  SelectedFormFields?: PostCreateFieldData[];
};

export type selectedNodeTypeProps = {
  incoming: string[];
  outgoing: string[];
};
export type SingleThemeObjProps = {
  id: number;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
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
  SalesAndOthers: subSecondNavbarType[];
  Vendor: subSecondNavbarType[];
  GeneralSetting: subSecondNavbarType[];
  Attribute: subSecondNavbarType[];
  Value: subSecondNavbarType[];
  CreateDictionary: subSecondNavbarType[];
};
export type subSecondNavbarType = { name: string; path: string };

export type mastersProps = {
  Plant: mastersPlantSubFields;
  General: mastersGeneralSubFields;
  MRPData: mastersMRPSubFields;
  SalesAndOthers: mastersSalesAndOthersSubFields;
  Vendor: mastersVendorSubsubFields;
  GeneralSetting: masterGeneralSettingsSubFields;
  Attribute: mastersVendorSubsubFields;
  Value: mastersVendorSubsubFields;
  CreateDictionary: mastersCreateTemplateSubsubFields;
};
export type masterGeneralSettingsSubFields = {
  MainGroupCodes: mastersGeneralSubsubFields;
  SubGroupCodes: mastersGeneralSubsubFields;
  SubSubGroupCodes: mastersGeneralSubsubFields;
  SourceType: mastersGeneralSubsubFields;
  NMUOM: mastersGeneralSubsubFields;
  ReferenceType: mastersGeneralSubsubFields;
  AttributeUOM: mastersGeneralSubsubFields;
  HSN: mastersGeneralSubsubFields;
};
export type mastersVendorSubsubFields = {
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
  keyName: string;
};
export type mastersCreateTemplateSubsubFields = {
  getAllnoun: string;
  getAllModifier: string;
  getAll: string;
  create: string;
  getById: string;
  delete: string;
  deleteBulk: string;
  update: string;
};

export type mastersPlantSubFields = {
  Plant: mastersPlantSubsubFields;
  ProfitCenter: mastersPlantSubsubFields;
  PriceControl: mastersPlantSubsubFields;
  StorageBin: mastersPlantSubsubFields;
  StorageLocation: mastersPlantSubsubFields;
  ValuationClass: mastersPlantSubsubFields;
  ValuationCategory: mastersPlantSubsubFields;
  VarianceKey: mastersPlantSubsubFields;
  Department: mastersPlantSubsubFields;
};

export type mastersPlantSubsubFields = {
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
export type mastersGeneralSubFields = {
  IndustrySector: mastersGeneralSubsubFields;
  MaterialType: mastersGeneralSubsubFields;
  BaseUOP: mastersGeneralSubsubFields;
  UnitOfIssue: mastersGeneralSubsubFields;
  AlternateUOM: mastersGeneralSubsubFields;
  InspectionType: mastersGeneralSubsubFields;
  InspectionCode: mastersGeneralSubsubFields;
  Division: mastersGeneralSubsubFields;
  SalesUnit: mastersGeneralSubsubFields;
};
export type mastersMRPSubFields = {
  MRPType: mastersGeneralSubsubFields;
  MRPController: mastersGeneralSubsubFields;
  LOTSize: mastersGeneralSubsubFields;
  ProcurementType: mastersGeneralSubsubFields;
  PlanningStrgyGrp: mastersGeneralSubsubFields;
  AvailCheck: mastersGeneralSubsubFields;
  ScheduleMargin: mastersGeneralSubsubFields;
};
export type mastersSalesAndOthersSubFields = {
  AccAssignment: mastersGeneralSubsubFields;
  DeliveringPlant: mastersGeneralSubsubFields;
  DistributionChannel: mastersGeneralSubsubFields;
  ItemCategoryGroup: mastersGeneralSubsubFields;
  LoadingGroup: mastersGeneralSubsubFields;
  MaterialStrategicGroup: mastersGeneralSubsubFields;
  OrderUnit: mastersGeneralSubsubFields;
  PurchasingGroup: mastersGeneralSubsubFields;
  PurchasingValueKey: mastersGeneralSubsubFields;
  SalesOrganization: mastersGeneralSubsubFields;
  TaxClassificaionClass: mastersGeneralSubsubFields;
  TaxClassificationType: mastersGeneralSubsubFields;
  TransportationGroup: mastersGeneralSubsubFields;
};
export type mastersGeneralSubsubFields = {
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
  keyName: string;
};
export type ValidMastersSalesAndOthersTabs =
  | "AccAssignment"
  | "DeliveringPlant"
  | "DistributionChannel"
  | "ItemCategoryGroup"
  | "LoadingGroup"
  | "MaterialStrategicGroup"
  | "OrderUnit"
  | "PurchasingGroup"
  | "PurchasingValueKey"
  | "SalesOrganization"
  | "TaxClassificaionClass"
  | "TaxClassificationType"
  | "TransportationGroup";
export type ValidMasterDataTabs =
  | "Plant"
  | "ProfitCenter"
  | "PriceControl"
  | "ValuationClass";
export type ValidMasterGeneralDataTabs =
  | "IndustrySector"
  | "MaterialType"
  | "BaseUOP"
  | "UnitOfIssue"
  | "AlternateUOM"
  | "InspectionCode"
  | "InspectionType"
  | "Division"
  | "SalesUnit";
export type ValidMasterMRPDataTabs =
  | "MRPType"
  | "MRPController"
  | "LOTSize"
  | "ProcurementType"
  | "PlanningStrgyGrp"
  | "AvailCheck"
  | "ScheduleMargin";
export type ValidMasterGeneralSettingabs =
  | "MainGroupCodes"
  | "SubGroupCodes"
  | "SubSubGroupCodes"
  | "NMUOM"
  | "SourceType"
  | "AttributeUOM"
  | "ReferenceType"
  | "HSN";

export interface PostCreateFieldData {
  id?: number;
  dataType: string;
  identity?: string;
  fieldName: string;
  pattern?: string[];
  min?: number;
  max?: number;
  isRequired: boolean;
  isExtraField?: boolean;
  isReadable?: boolean;
  isWritable?: boolean;
  isUnique?: boolean;
  enums?: string[];
  dropDowns?: Option[];
  displayRelationFieldName?: string;
}
export interface Option {
  id?: string;
  optionValue: string;
}
export type PathObjProps = {
  Masters: { name: string; path: string }[];
  UserManagement: { name: string; path: string }[];
  Settings: { name: string; path: string }[];
  Dynamic: { name: string; path: string }[];
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
  updateAuditHistories?: [];
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
  updateAuditHistories?: [];
};
export type PrivilageInitialStateProps = {
  id?: number;
  name: string;
  status: boolean;
  updateAuditHistories?: [];
  createdAt?: string;
  createdBy?: string;
};
export type KeysToRemoveEditMaster =
  | "createdAt"
  | "createdBy"
  | "updateAuditHistories"
  | "plant"
  | "salesOrganization"
  | "updatedAt"
  | "updatedBy"
  | "storageLocation"
  | "subGroupCodesId";

export type CharacteristicSingleProps = {
  id: number;
  attributeId: number;
  shortPriority: number;
  mandatory: boolean;
  definition: string;
  valueId: number[];
  uomMandatory: boolean;
  attrUomId: number[];
};

export interface AttributeMasterSingle {
  id: number;
  attributeName: string;
  fieldType: string;
  listUom: ListUom[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListUom {
  id: number;
  attributeUomName: string;
  attributeUnit: string;
  attributeUomStatus: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
export type SingleUserInfoProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  business: string;
  departmentId: number;
  plantId: number[];
  status: boolean;
  roles: number[];
  avatar: string;
};
export type SnackBarReusableProps = {
  open: boolean;
  message: string;
  severity: "success" | "info" | "error" | "warning";
};

export type fontPropertyProps = {
  id: number;
  fontFormat: string;
  fontSize: number;
  fontWeight: string;
};
export type DynamicFormsProps = {
  id: number;
  formName: string;
  fields: PostCreateFieldData[];
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};
