import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { Chip, FormControlLabel, SelectChangeEvent } from "@mui/material";
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
          Dropdown Type *
        </TextComp>
        <SingleSelectDropdown
          label="Select Field"
          value={valueData?.identity ?? ``}
          onChange={handleSelect}
          options={[
            { value: "single", label: "Single Select" },
            { value: "multiple", label: "Multiple Select" },
          ]}
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
          Enter Options *
        </TextComp>

        <OutlineTextField
          fullWidth
          name="Options"
          placeholder="Enter Options"
          onChange={chipHandler}
          value={chipText}
          onKeyDown={dropHandler}
          autoComplete="off"
        />
      </div>

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
          <TextComp
            variant="bodySmall"
            style={{
              color: PrimaryTextColor,
              fontWeight: "600",
            }}
          >
            options listed here
          </TextComp>
        ) : (
          ""
        )}
      </div>
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
