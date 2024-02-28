import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import { PrimaryTextColor } from "@/styles/colorsCode";
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
          Enter Options *
        </TextComp>
        <OutlineTextField
          fullWidth
          name="Options"
          placeholder="Enter Options"
          onChange={setChipIntoDivHandler}
          value={ChipTextIndiual}
          onKeyDown={ChipEnterHandler}
          autoComplete="off"
        />
      </div>

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
    </div>
  );
}
