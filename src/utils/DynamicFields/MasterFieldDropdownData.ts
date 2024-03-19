import api from "@/components/api";
import { Dispatch, SetStateAction } from "react";
import {
  PostCreateFieldData,
  SnackBarReusableProps,
} from "../../../TypesStore";
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

// Create a utility function to fetch and update field data
export const getUpdatedFieldData = async (
  formName: string,
  setSelectedFormFields: Dispatch<SetStateAction<PostCreateFieldData[]>>,
  setReusableSnackBar: Dispatch<SetStateAction<SnackBarReusableProps>>
) => {
  try {
    const resField = await api.get(
      `/dynamic/getAllDynamicFieldsByForm/${formName}`
    );
    const dataField = await resField.data;

    if (resField.status === 200) {
      let updatedFields = [...dataField];

      const promises = updatedFields.map(async (obj) => {
        if (obj.dataType === "relational") {
          try {
            const res = await api.get(
              `/dynamic/getListOfFieldNameValues?displayName=${obj.displayRelationFieldName}&formName=${obj.fieldName}`
            );
            const responseData = res.data;

            // Update the enums property of the relational field
            return { ...obj, enums: responseData };
          } catch (error) {
            console.error("Error fetching data:", error);
            return obj; // Return original object if an error occurs
          }
        }
        return obj; // Return original object if not a relational field
      });

      // Wait for all asynchronous operations to complete
      const updatedFieldsWithData: PostCreateFieldData[] = await Promise.all(
        promises
      );

      // Update the state with the updatedFields
      setSelectedFormFields(updatedFieldsWithData);
    }
  } catch (e: any) {
    if (setReusableSnackBar) {
      setReusableSnackBar({
        severity: "error",
        message: `Error: ${e?.message} on getting updated fields`,
        open: true,
      });
    }
  }
};

// Now you can use this function wherever you need to fetch and update field data
