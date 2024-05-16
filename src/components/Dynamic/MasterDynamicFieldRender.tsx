import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
import { textCompStyle } from "@/utils/UserDataExport";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { PostCreateFieldData } from "../../../TypesStore";
import RadioGroupComponent from "../RadioButton/RadioGroup";
import TextComp from "../TextComp/TextComp";
import OutlineTextField from "../Textfield/OutlineTextfield";
import TextareaOutline from "../Textfield/TextareaOutline";
import "./MasterDynamicFieldRender.scss";

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
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              {data.fieldName}
              <span>:</span>
            </TextComp>
            <OutlineTextField
              placeholder={`Enter ${data.fieldName}`}
              fullWidth
              key={data.id}
              type={data.identity}
              value={formData[data.fieldName]}
              onChange={handleInputChange}
              name={data.fieldName}
              error={!!dynFldErrValidation[data.fieldName]}
              helperText={dynFldErrValidation[data.fieldName]}
            />
          </div>
        );
      case "textArea":
        return (
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              {data.fieldName}
              <span>:</span>
            </TextComp>
            <TextareaOutline
              placeholder={`Enter ${data.fieldName}`}
              key={data.id}
              fullWidth
              rows={typeof Number(data.identity) ? data.identity : 2}
              value={formData[data.fieldName]}
              onChange={handleInputChange}
              name={data.fieldName}
              error={!!dynFldErrValidation[data.fieldName]}
              helperText={dynFldErrValidation[data.fieldName]}
            />
          </div>
        );
      case "dropDown":
        return data.identity === "single" ? (
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select {data.fieldName}
              <span>:</span>
            </TextComp>
            <DynamicSingleSelectDropdown
              label={`Select ${data.fieldName}`}
              key={data.id}
              value={formData[data.fieldName]}
              onChange={handleSelectChange}
              options={data.dropDowns ?? []}
              name={data.fieldName}
            />
          </div>
        ) : (
          <div className="create-dynamic-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select {data.fieldName}
              <span>:</span>
            </TextComp>
            <MultipleDynamicSelectDropdown
              label={`Select ${data.fieldName}`}
              key={data.id}
              value={formData[data.fieldName]}
              onChange={handleMultiSelectChange}
              options={data.dropDowns ?? []}
              name={data.fieldName}
            />
          </div>
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
