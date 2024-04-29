import { MaterialMasterFormFieldProps } from "../../../TypesStore";
import { capitalizeFunc } from "../capitalizeFunc";

export const getMMFieldDisplayName = (
  value: string,
  fields: MaterialMasterFormFieldProps[]
) => {
  const MMdata = fields?.filter((data) => data.isField === true);
  const rtnData = MMdata?.filter((data) => data.name === value)[0]?.displayName;
  return rtnData.length > 0 ? rtnData : capitalizeFunc(value);
};
