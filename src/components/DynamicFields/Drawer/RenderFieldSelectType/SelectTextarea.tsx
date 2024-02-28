import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { FormControlLabel, SelectChangeEvent } from "@mui/material";
import { ChangeEvent } from "react";
import { PostCreateFieldData } from "../../../../../TypesStore";

export default function SelectTextarea({
  handleCheckBox,
  handleSelect,
  handleInput,
  valueData,
}: {
  valueData: PostCreateFieldData;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (e: SelectChangeEvent) => void;
  handleCheckBox: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="render-fields-namess">
      <div className="input-render-field-wrap">
        <TextComp
          variant="bodySmall"
          style={{
            color: PrimaryTextColor,
            fontWeight: "600",
            alignSelf: "flex-start",
            textTransform: "uppercase",
          }}
        >
          Enter Name *
        </TextComp>
        <OutlineTextField
          name="fieldName"
          placeholder="Enter Name"
          autoComplete="off"
          value={valueData?.fieldName}
          fullWidth
          onChange={handleInput}
        />
      </div>
      <div className="input-render-field-wrap">
        <TextComp
          variant="bodySmall"
          style={{
            color: PrimaryTextColor,
            fontWeight: "600",
            alignSelf: "flex-start",
            textTransform: "uppercase",
          }}
        >
          Select Number of lines *
        </TextComp>
        <SingleSelectDropdown
          label="Select Field"
          value={valueData?.identity ?? ""}
          onChange={handleSelect}
          options={[
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "3", label: "Three" },
          ]}
        />
      </div>

      <div className="minmaxval">
        <TextComp
          variant="bodySmall"
          style={{
            color: PrimaryTextColor,
            fontWeight: "600",
            width: "40%",
            margin: "auto 0",
          }}
        >
          Min * :
        </TextComp>
        <OutlineTextField
          type="number"
          fullWidth
          name="min"
          value={valueData?.min}
          placeholder="Enter No"
          autoComplete="off"
          onChange={handleInput}
        />
        <TextComp
          variant="bodySmall"
          style={{
            color: PrimaryTextColor,
            fontWeight: "600",
            width: "40%",
            margin: "auto 0",
          }}
        >
          Max * :
        </TextComp>
        <OutlineTextField
          fullWidth
          type="number"
          placeholder="Enter No"
          name="max"
          autoComplete="off"
          value={valueData?.max}
          onChange={handleInput}
        />
      </div>

      {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
Select Required
</label> */}
      <FormControlLabel
        control={
          <ReusableSwitch
            checked={valueData.required}
            onChange={handleInput}
            name="required"
          />
        }
        label="Textarea fill required (yes / no) : "
        labelPlacement="start"
      />
    </div>
  );
}
