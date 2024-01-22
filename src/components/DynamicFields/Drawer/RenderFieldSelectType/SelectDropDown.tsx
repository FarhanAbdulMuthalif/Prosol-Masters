import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import {
  Chip,
  FormControlLabel,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Option, PostCreateFieldData } from "../../../../../TypesStore";

export default function SelectDropDown({
  handleSelect,
  handleInput,
  valueData,
  chipText,
  chipHandler,
  dropHandler,
  dDChipList,
  setDDChipList,
}: {
  valueData: PostCreateFieldData;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelect: (e: SelectChangeEvent) => void;
  chipText: string;
  chipHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  dropHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  dDChipList: Option[];
  setDDChipList: Dispatch<SetStateAction<Option[]>>;
}) {
  return (
    <div className="render-fields-namess">
      <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
      <OutlineTextField
        fullWidth
        name="fieldName"
        placeholder="Enter Name"
        autoComplete="off"
        value={valueData?.fieldName}
        onChange={handleInput}
      />
      <label id="DrawerInputIdSelect">Dropdown Type *</label>
      <SingleSelectDropdown
        label="Select Field"
        value={valueData?.identity ?? ""}
        onChange={handleSelect}
        options={[
          { value: "single", label: "Single Select" },
          { value: "multiple", label: "Multiple Select" },
        ]}
      />

      <label id="DrawerInputIdSelect">Enter Options *</label>
      <OutlineTextField
        fullWidth
        name="Options"
        placeholder="Enter Options"
        onChange={chipHandler}
        value={chipText}
        onKeyDown={dropHandler}
        autoComplete="off"
      />

      <div className="api-chip-wrapper-div">
        {dDChipList?.map((data: Option) => {
          return (
            <Chip
              key={data.value}
              label={data.value}
              onDelete={() => {
                setDDChipList((prev: Option[]) =>
                  prev.filter((chip: Option) => chip.value !== data.value)
                );
              }}
            />
          );
        })}
        {dDChipList?.length < 1 ? (
          <p style={{ fontSize: "12px" }}>options listed here</p>
        ) : (
          ""
        )}
      </div>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            size="medium"
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
