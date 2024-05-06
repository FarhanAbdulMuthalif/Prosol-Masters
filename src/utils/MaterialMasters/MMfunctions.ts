import { MaterialMasterFormFieldProps } from "../../../TypesStore";
import { capitalizeFunc } from "../capitalizeFunc";
import { MaterialMasteresData } from "./MMData";

export const getMMFieldDisplayName = (
  value: string,
  fields: MaterialMasterFormFieldProps[]
) => {
  const MMdata = fields?.filter((data) => data.isField === true);
  const rtnData = MMdata?.filter((data) => data.name === value)[0]?.displayName;
  return rtnData.length > 0 ? rtnData : capitalizeFunc(value);
};
export const getMMTabData = () => {
  let tabArr: { label: string; value: string }[] = [];
  MaterialMasteresData.formFields?.forEach((field) => {
    if (field.isHaveSubForm || !field.isField) {
      const data = { label: field.displayName, value: field.name };
      tabArr.push(data);

      // tabs = tabs.filter((data) => data.value !== field.name);
    }
  });
  return tabArr;
};
const descriptionFields = MaterialMasteresData.formFields?.filter(
  (field) => field.name === "description"
)[0];
export const getMMDescriptionTabData = () => {
  const dataTab = descriptionFields.formFields.map((data) => {
    return { label: data.displayName, value: data.name };
  });
  return dataTab;
};
