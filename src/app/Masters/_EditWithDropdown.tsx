"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import RadioGroupComponent from "@/components/RadioButton/RadioGroup";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../TypesStore";

export default function EditMasterWithDropdown({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });

  const [formData, setFormData] = useState<any>(EditDataGet);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, settabValue, setReusableSnackBar } =
    PlantDataCon;
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  useEffect(() => {
    const dynamicFormFieldHandler = async () => {
      try {
        const res = await api.get(
          `/dynamic/getAllDynamicFieldsByForm/${SelectedMasterDatatab}`
        );
        const data = await res.data;
        if (res.status === 200) {
          setdynamicFields(data);
        }
      } catch (e: any) {
        if (!setReusableSnackBar) return;
        if (e?.response?.status === 404 || e?.response?.status === 400) return;
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
    };
    setFormData((prev: any) => ({ ...prev, plantId: prev?.plant?.id }));
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab, setReusableSnackBar]);

  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;

  if (!SelectedMasterDatatab || !settabValue || !setReusableSnackBar) {
    return null;
  }
  const fieldName = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Name`;
  const fieldCode = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Code`;
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData[fieldName]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (formData[fieldCode]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    const { id, email, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updateAuditHistories",
      "plant",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete filteredUserData[key]);
    if (formData[fieldCode]?.length && formData[fieldName]?.length > 0) {
      try {
        const response = await api.put(
          `${
            (masters[ExactPath] as mastersPlantSubFields)[
              SelectedMasterDatatab as ValidMasterDataTabs
            ].update
          }/${id}`,
          filteredUserData
        );
        const data = await response.data;
        if (response.status === 200) {
          console.log(data);
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} updated Sucessfully!`,
            open: true,
          }));
          settabValue("table");
        }
      } catch (e: any) {
        console.log(e?.response);
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
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, plantId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const PlantDropDownData = originalArray
    ? (originalArray as { id: number; plantName: string }[]).map(
        ({ id, plantName }) => ({
          value: id,
          label: plantName,
        })
      )
    : [];
  if (!PlantDropDownData) {
    return null;
  }
  const DwnValue = PlantDropDownData.find(
    (data) => data.value === formData.plantId
  )?.label;
  const handleSelectDynChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const handleMultiSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: Array.isArray(value) ? value : [],
    }));
  };

  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Name`}
            type="text"
            value={formData ? formData[fieldName] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.name
                ? `${SelectedMasterDatatab}Name Should not be empty`
                : ""
            }
            error={plantFormError.name}
            name={`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Name`}
          />
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Code`}
            type="text"
            value={formData ? formData[fieldCode] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.code
                ? `${SelectedMasterDatatab}Code Should not be empty`
                : ""
            }
            error={plantFormError.code}
            name={`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Code`}
          />
          <NameSingleSelectDropdown
            value={DwnValue ? DwnValue : ""}
            onChange={handleSelectChange}
            options={PlantDropDownData}
            label={"Select Plant"}
            name="plantId"
          />
          {dynamicFields?.map((data: PostCreateFieldData) => {
            return (
              <>
                {data.dataType === "textField" ? (
                  <OutlineTextField
                    placeholder={`Enter ${data.fieldName}`}
                    key={data.id}
                    type={data.identity}
                    value={formData[data.fieldName]}
                    onChange={handleInputChange}
                    name={data.fieldName}
                    inputProps={{
                      autoComplete: "new-password",
                      maxLength: data.max,
                      minLength: data.min,
                    }}
                  />
                ) : data.dataType === "textArea" ? (
                  <TextareaOutline
                    placeholder={`Enter ${data.fieldName}`}
                    key={data.id}
                    rows={typeof Number(data.identity) ? data.identity : 2}
                    value={formData[data.fieldName]}
                    onChange={handleInputChange}
                    name={data.fieldName}
                    inputProps={{
                      autoComplete: "new-password",
                      maxLength: data.max,
                      minLength: data.min,
                    }}
                  />
                ) : data.dataType === "dropDown" &&
                  data.identity === "single" ? (
                  <DynamicSingleSelectDropdown
                    label={`Select ${data.fieldName}`}
                    value={formData[data.fieldName]}
                    onChange={handleSelectDynChange}
                    options={data.dropDowns ? data.dropDowns : []}
                    name={data.fieldName}
                  />
                ) : data.dataType === "dropDown" &&
                  data.identity === "multiple" ? (
                  <MultipleDynamicSelectDropdown
                    label={`Select ${data.fieldName}`}
                    value={formData[data.fieldName]}
                    onChange={handleMultiSelectChange}
                    options={data.dropDowns ? data.dropDowns : []}
                    name={data.fieldName}
                  />
                ) : data.dataType === "radioButton" ? (
                  <RadioGroupComponent
                    label={`${data.fieldName} :`}
                    name={data.fieldName}
                    options={data.enums ? data?.enums : []}
                    value={formData[data.fieldName]}
                    onChange={handleInputChange}
                  />
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
        <MasterAuditTrial formData={formData}></MasterAuditTrial>
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
