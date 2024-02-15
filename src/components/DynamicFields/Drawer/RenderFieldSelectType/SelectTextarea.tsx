import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
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
      <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
      <OutlineTextField
        name="fieldName"
        placeholder="Enter Name"
        autoComplete="off"
        value={valueData?.fieldName}
        fullWidth
        onChange={handleInput}
      />

      <label id="DrawerInputIdSelect">Select Number of lines *</label>
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

      <div className="minmaxval">
        <label className="minmaxLabel">Min :</label>
        <OutlineTextField
          type="number"
          fullWidth
          name="min"
          value={valueData?.min}
          placeholder="Enter No"
          autoComplete="off"
          onChange={handleInput}
        />
        <label className="minmaxLabel">Max :</label>
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
