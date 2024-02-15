import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import { PostCreateFieldData } from "../../../../../TypesStore";

export default function SelectTextfield({
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
        size="small"
        name="fieldName"
        placeholder="Enter Name"
        autoComplete="off"
        value={valueData?.fieldName}
        onChange={handleInput}
        fullWidth
      />

      <label id="DrawerInputIdSelect">Select Textbox Type *</label>
      <SingleSelectDropdown
        label="Select Field"
        value={valueData?.identity ?? ""}
        onChange={handleSelect}
        options={[
          { value: "text", label: "Text" },
          { value: "number", label: "Number" },
          { value: "password", label: "Password" },
          { value: "radioButton", label: "RadioButton" },
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

      <FormGroup className="validating-checkbox-div">
        <FormControlLabel
          sx={{ margin: "0" }}
          control={
            <Checkbox
              size="small"
              name="includeSpecialChars"
              value="spl"
              onChange={handleCheckBox}
            />
          }
          label={<Typography variant="body2">Special Character</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="includeNumbers"
              value="num"
              onChange={handleCheckBox}
            />
          }
          label={<Typography variant="body2">Numbers</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="includeAlphabets"
              value="alp"
              onChange={handleCheckBox}
            />
          }
          label={<Typography variant="body2">Alphabets Letter</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="includeCapitalLetters"
              value="cap"
              onChange={handleCheckBox}
            />
          }
          label={<Typography variant="body2">Capital Letter</Typography>}
        />
      </FormGroup>

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
