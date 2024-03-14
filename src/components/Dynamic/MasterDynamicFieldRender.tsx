import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { PostCreateFieldData } from "../../../TypesStore";
import RadioGroupComponent from "../RadioButton/RadioGroup";
import OutlineTextField from "../Textfield/OutlineTextfield";
import TextareaOutline from "../Textfield/TextareaOutline";

export default function MasterDynamicFieldRender({
  formData,
  dynamicFields,
  handleInputChange,
  handleMultiSelectChange,
  handleSelectChange,
  dynFldErrValidation,
}: {
  formData: any;
  dynamicFields: PostCreateFieldData[];
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleMultiSelectChange: (event: SelectChangeEvent) => void;
  dynFldErrValidation: Record<string, string>;
}) {
  const renderField = (data: PostCreateFieldData) => {
    switch (data.dataType) {
      case "textField":
        return (
          <OutlineTextField
            placeholder={`Enter ${data.fieldName}`}
            key={data.id}
            type={data.identity}
            value={formData[data.fieldName]}
            onChange={handleInputChange}
            name={data.fieldName}
            error={!!dynFldErrValidation[data.fieldName]}
            helperText={dynFldErrValidation[data.fieldName]}
          />
        );
      case "textArea":
        return (
          <TextareaOutline
            placeholder={`Enter ${data.fieldName}`}
            key={data.id}
            rows={typeof Number(data.identity) ? data.identity : 2}
            value={formData[data.fieldName]}
            onChange={handleInputChange}
            name={data.fieldName}
            error={!!dynFldErrValidation[data.fieldName]}
            helperText={dynFldErrValidation[data.fieldName]}
          />
        );
      case "dropDown":
        return data.identity === "single" ? (
          <DynamicSingleSelectDropdown
            label={`Select ${data.fieldName}`}
            value={formData[data.fieldName]}
            onChange={handleSelectChange}
            options={data.dropDowns ?? []}
            name={data.fieldName}
          />
        ) : (
          <MultipleDynamicSelectDropdown
            label={`Select ${data.fieldName}`}
            value={formData[data.fieldName]}
            onChange={handleMultiSelectChange}
            options={data.dropDowns ?? []}
            name={data.fieldName}
          />
        );
      case "radioButton":
        return (
          <RadioGroupComponent
            label={`${data.fieldName} :`}
            name={data.fieldName}
            options={data.enums ?? []}
            value={formData[data.fieldName]}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      {dynamicFields?.map((data: PostCreateFieldData) => {
        return (
          <>
            {/* {data.dataType === "textField" ? (
              <OutlineTextField
                placeholder={`Enter ${data.fieldName}`}
                key={data.id}
                type={data.identity}
                value={formData[data.fieldName]}
                onChange={handleInputChange}
                name={data.fieldName}
                // inputProps={{
                //   autoComplete: "new-password",
                //   maxLength: data.max,
                //   minLength: data.min,
                // }}
                error={
                  dynFldErrValidation[data.fieldName]?.length > 0 ? true : false
                }
                helperText={dynFldErrValidation[data.fieldName]}
              />
            ) : data.dataType === "textArea" ? (
              <TextareaOutline
                placeholder={`Enter ${data.fieldName}`}
                key={data.id}
                rows={typeof Number(data.identity) ? data.identity : 2}
                value={formData[data.fieldName]}
                onChange={handleInputChange}
                name={data.fieldName}
                // inputProps={{
                //   autoComplete: "new-password",
                //   maxLength: data.max,
                //   minLength: data.min,
                // }}
                error={
                  dynFldErrValidation[data.fieldName]?.length > 0 ? true : false
                }
                helperText={dynFldErrValidation[data.fieldName]}
              />
            ) : data.dataType === "dropDown" && data.identity === "single" ? (
              <DynamicSingleSelectDropdown
                label={`Select ${data.fieldName}`}
                value={formData[data.fieldName]}
                onChange={handleSelectChange}
                options={data.dropDowns ? data.dropDowns : []}
                name={data.fieldName}
              />
            ) : data.dataType === "dropDown" && data.identity === "multiple" ? (
              <MultipleDynamicSelectDropdown
                label={`Select ${data.fieldName}`}
                value={formData[data.fieldName]}
                onChange={handleMultiSelectChange}
                options={data.dropDowns ? data.dropDowns : []}
                name={data.fieldName}
              />
            ) : data.dataType === "radioButton" ? (
              <RadioGroupComponent
                label={`${data.fieldName} :`}
                name={data.fieldName}
                options={data.enums ? data?.enums : []}
                value={formData[data.fieldName]}
                onChange={handleInputChange}
              />
            ) : (
              ""
            )} */}
            {renderField(data)}
          </>
        );
      })}
    </>
  );
}
