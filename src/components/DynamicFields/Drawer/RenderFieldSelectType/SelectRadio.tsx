import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { Chip } from "@mui/material";
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { PostCreateFieldData } from "../../../../../TypesStore";

export default function SelectRadio({
  handleInput,
  valueData,
  ChipEnterHandler,
  ChipTextIndiual,
  setChipIntoDivHandler,
  ChipArrayList,
  setChipArrayList,
}: {
  valueData: PostCreateFieldData;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  ChipEnterHandler: (e: KeyboardEvent<HTMLInputElement>) => void;
  ChipTextIndiual: string;
  setChipIntoDivHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  ChipArrayList: string[];
  setChipArrayList: Dispatch<SetStateAction<string[]>>;
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

      <label id="DrawerInputIdSelect">Enter Options *</label>
      <OutlineTextField
        fullWidth
        name="Options"
        placeholder="Enter Options"
        onChange={setChipIntoDivHandler}
        value={ChipTextIndiual}
        onKeyDown={ChipEnterHandler}
        autoComplete="off"
      />

      <div className="api-chip-wrapper-div">
        {ChipArrayList?.map((data: string) => {
          return (
            <Chip
              key={data}
              label={data}
              onDelete={() => {
                setChipArrayList((prev: string[]) =>
                  prev.filter((chip: string) => chip !== data)
                );
              }}
            />
          );
        })}
        {ChipArrayList?.length < 1 ? (
          <p style={{ fontSize: "12px" }}>options listed here</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
