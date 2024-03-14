import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { PrimaryTextColor } from "@/styles/colorsCode";
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
          size="small"
          name="fieldName"
          placeholder="Enter Name"
          autoComplete="off"
          value={valueData?.fieldName}
          onChange={handleInput}
          fullWidth
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
          Select Textbox Type *
        </TextComp>
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

      <FormControlLabel
        control={
          <ReusableSwitch
            checked={valueData.isRequired}
            onChange={handleInput}
            name="isRequired"
          />
        }
        label="Textarea fill required (yes / no) : "
        labelPlacement="start"
      />
    </div>
  );
}
