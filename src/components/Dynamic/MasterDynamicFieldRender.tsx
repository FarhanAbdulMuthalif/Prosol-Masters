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
            key={data.id}
            value={formData[data.fieldName]}
            onChange={handleSelectChange}
            options={data.dropDowns ?? []}
            name={data.fieldName}
          />
        ) : (
          <MultipleDynamicSelectDropdown
            label={`Select ${data.fieldName}`}
            key={data.id}
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
            key={data.id}
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
        return <>{renderField(data)}</>;
      })}
    </>
  );
}
