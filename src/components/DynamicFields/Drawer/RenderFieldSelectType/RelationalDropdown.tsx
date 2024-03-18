import { UseContextHook } from "@/Provides/UseContextHook";
import SingleSelectDropdown from "@/components/Dropdown/SingleSelectDropdown";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import TextComp from "@/components/TextComp/TextComp";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import {
  default as FormDataDropdown,
  default as SearchFormDataDropdown,
} from "@/utils/DynamicFields/DynComponents/SearchFormDataDropdown";
import { MasterFieldDropdownDataFormName } from "@/utils/DynamicFields/MasterFieldDropdownData";
import { FormControlLabel, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PostCreateFieldData } from "../../../../../TypesStore";

export default function RelationalDropdown({
  handleSelect,
  handleInput,
  handleSelectForm,
  valueData,
}: {
  valueData: PostCreateFieldData;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSelectForm: (e: SelectChangeEvent) => void;
  handleSelect: (e: SelectChangeEvent) => void;
}) {
  const [SelectedFormFieldsDwnData, setSelectedFormFieldsDwnData] = useState(
    []
  );
  const contextDataHub = useContext(UseContextHook);
  const { setReusableSnackBar } = contextDataHub;
  useEffect(() => {
    async function getter() {
      if (valueData.fieldName.length === 0) return;
      try {
        const res = await api.get(
          `/dynamic/getAllFieldNamesOfForm/${
            valueData.fieldName ? valueData.fieldName : ""
          }`
        );
        if (res.status === 200) {
          setSelectedFormFieldsDwnData(res.data);
        }
      } catch (e: any) {
        console.log(e?.response);
        if (!setReusableSnackBar) return;
        if (e?.response) {
          setReusableSnackBar((prev) => ({
            severity: "error",
            message: String(
              e?.response?.data?.message
                ? e?.response?.data?.message
                : e?.response?.data?.error
            ),
            open: true,
          }));
        } else {
          setReusableSnackBar((prev) => ({
            severity: "error",
            message: `Error: ${e?.message}`,
            open: true,
          }));
        }
      }
    }
    getter();
  }, [valueData.fieldName, setReusableSnackBar]);
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
          Select FieldName *
        </TextComp>
        <SearchFormDataDropdown
          label="Select Form"
          value={valueData?.fieldName ?? ""}
          onChange={handleSelectForm}
          options={MasterFieldDropdownDataFormName}
          name="fieldName"
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
          value={valueData?.identity ?? ""}
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
          Select Display Fields *
        </TextComp>
        <FormDataDropdown
          label="Select Field"
          value={valueData?.displayRelationFieldName ?? ""}
          onChange={handleSelectForm}
          options={SelectedFormFieldsDwnData}
          name="displayRelationFieldName"
        />
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
