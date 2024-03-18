import api from "@/components/api";
import { MasterSubFieldWithData } from "../masters/plant";

// Write a function to transform the data
const transformData = (data: { [key: string]: any }) => {
  const arrVal = Object.keys(data).map((moduleName) => {
    const subModules = Object.keys(data[moduleName]);
    return { moduleName, subModules };
  });
  return arrVal;
};

// Your original data

// Transform the data
const MasterFieldDropdownDataBeforeTranform = transformData(
  MasterSubFieldWithData
);
const modulesToFilter = ["Vendor", "Attribute", "Value", "CreateTemplate"];
export const MasterFieldDropdownDataFormName =
  MasterFieldDropdownDataBeforeTranform.map(({ moduleName, subModules }) => ({
    moduleName,
    subModules: modulesToFilter.includes(moduleName)
      ? [moduleName]
      : subModules,
  }))
    .map((item) => item.subModules)
    .flat();

export const diplayFieldsFRomForm = async (name: string, form: string) => {
  try {
    const res = await api.get(
      `/dynamic/getListOfFieldNameValues?displayName=${name}&formName=${form}`
    );
    const data = await res.data;
    if (res.status === 200) {
      return data;
    }
  } catch (e: any) {
    return null;
  }
};
