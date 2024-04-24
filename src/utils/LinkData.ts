import { PathObjProps } from "../../TypesStore";

export const pathObj: PathObjProps = {
  Masters: [
    { name: "Plant", path: "/Masters" },
    { name: "General", path: "/Masters/General" },
    { name: "MRPData", path: "/Masters/MRPData" },
    { name: "SalesAndOthers", path: "/Masters/SalesAndOthers" },
    { name: "Vendor", path: "/Masters/Vendor" },
    { name: "GeneralSetting", path: "/Masters/GeneralSetting" },
    { name: "Attribute", path: "/Masters/Attribute" },
    { name: "Value", path: "/Masters/Value" },
    { name: "CreateTemplate", path: "/Masters/CreateTemplate" },
  ],
  UserManagement: [
    { name: "User", path: "/UserManagement" },
    { name: "Role", path: "/UserManagement/Role" },
    { name: "Privilage", path: "/UserManagement/Privilage" },
  ],
  Settings: [{ name: "UI Settings", path: "/Settings" }],
  Dynamic: [
    { name: "Dynamic Form", path: "/Dynamic" },
    { name: "Dynamic Field", path: "/Dynamic/DynamicField" },
    { name: "Workflow", path: "/Dynamic/Workflow" },
  ],
};
