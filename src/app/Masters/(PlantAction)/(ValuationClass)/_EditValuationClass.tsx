"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { validateField } from "@/utils/DynamicFields/DynamicFunction";
import { textCompStyle } from "@/utils/UserDataExport";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../../../TypesStore";

// Import statements...

export default function EditValuationClass({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
    id: false,
  });
  const [formData, setFormData] = useState<any>(EditDataGet);

  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, settabValue, setReusableSnackBar } =
    PlantDataCon;
  const { data: originalArray } = useFetch("/general/getAllMaterial") ?? {
    data: [],
  };
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
        console.log(e?.response);
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
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab, setReusableSnackBar]);

  const [dynFldErrValidation, setdynFldErrValidation] = useState<
    Record<string, string>
  >({});
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
  const PlantDropDownData = originalArray
    ? (originalArray as { id: number; materialName: string }[]).map(
        ({ id, materialName }) => ({
          value: id,
          label: materialName,
        })
      )
    : [];
  if (!PlantDropDownData) {
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
    }
    if (formData["materialTypeId"] < 1) {
      setplantFormError((prev) => ({ ...prev, id: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false, id: false }));
    }
    const { id, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updateAuditHistories",
      "plant",
      "storageLocation",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete filteredUserData[key]);
    const validationErrors: Record<string, string> = {};
    for (const field of dynamicFields) {
      const value = formData[field.fieldName];
      const error = validateField(field, value);
      if (error) {
        validationErrors[field.fieldName] = error;
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setdynFldErrValidation(validationErrors);
      return; // Prevent form submission if there are errors
    }
    if (formData[fieldCode]?.length > 0 && formData[fieldName]?.length > 0) {
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
          setFormData((prev: any) => {
            return { [fieldName]: "", [fieldCode]: "" };
          });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`${
        SelectedMasterDatatab.charAt(0).toLowerCase() +
        SelectedMasterDatatab.slice(1)
      }Status`]: true,
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const DwnValue = PlantDropDownData.find(
    (data) => data.value === formData?.materialTypeId
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
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              {SelectedMasterDatatab} Name
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
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
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              {SelectedMasterDatatab} Code
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
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
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select Material Type
              <span>:</span>
            </TextComp>
            <NameSingleSelectDropdown
              value={DwnValue ? DwnValue : ""}
              onChange={handleSelectChange}
              options={PlantDropDownData}
              label={"Select Material Type"}
              name="materialTypeId"
            />
          </div>
          <MasterDynamicFieldRender
            formData={formData}
            dynamicFields={dynamicFields}
            handleInputChange={handleInputChange}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSelectChange={handleSelectChange}
            dynFldErrValidation={dynFldErrValidation}
          />
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton
            onClick={() => {
              settabValue("table");
            }}
          >
            Cancel
          </OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
        <MasterAuditTrial formData={formData}></MasterAuditTrial>
      </div>
    </form>
  );
}
