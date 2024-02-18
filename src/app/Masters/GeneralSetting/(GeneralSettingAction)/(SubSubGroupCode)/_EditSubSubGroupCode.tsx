"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { validateField } from "@/utils/DynamicFields/DynamicFunction";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  ValidMasterGeneralSettingabs,
  masterGeneralSettingsSubFields,
  mastersProps,
} from "../../../../../../TypesStore";

// Import statements...

export default function EditSubSubGroupCode({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, settabValue, setReusableSnackBar } =
    PlantDataCon;

  const [formData, setFormData] = useState<any>(EditDataGet);
  useEffect(() => {
    setFormData((prev: any) => {
      return {
        ...prev,
        mainGroupCodesId: EditDataGet?.mainGroupCodesId?.id,
        subGroupId: EditDataGet?.subGroupId?.id,
      };
    });
    const dynamicFormFieldHandler = async () => {
      try {
        const res = await api.get(
          `/dynamic/getAllFieldsByForm/${SelectedMasterDatatab}`
        );
        const data = await res.data;
        if (res.status === 200) {
          setdynamicFields(data);
        }
      } catch (e: any) {
        if (!setReusableSnackBar) return;
        if (e?.response?.status === 404) return;
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
  }, [SelectedMasterDatatab, EditDataGet, setReusableSnackBar]);
  const [dynFldErrValidation, setdynFldErrValidation] = useState<
    Record<string, string>
  >({});
  const { data: originalArray } = useFetch("/setting/getAllMainGroupCodes") ?? {
    data: [],
  };
  const MainGroupDropDownData = originalArray
    ? (originalArray as { id: number; mainGroupName: string }[]).map(
        ({ id, mainGroupName }) => ({
          value: id,
          label: mainGroupName,
        })
      )
    : [];
  const { data: originalArraySubGroup } = useFetch(
    "/setting/getAllSubGroupCodes"
  ) ?? {
    data: [],
  };
  const SubGroupDropDownData = originalArraySubGroup
    ? (originalArraySubGroup as { id: number; subGroupName: string }[]).map(
        ({ id, subGroupName }) => ({
          value: id,
          label: subGroupName,
        })
      )
    : [];
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  if (
    !SelectedMasterDatatab ||
    !MainGroupDropDownData ||
    !settabValue ||
    !SubGroupDropDownData ||
    !setReusableSnackBar
  ) {
    return null;
  }
  const fieldName = `${
    (masters[ExactPath] as masterGeneralSettingsSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralSettingabs
    ]?.keyName
  }Name`;
  const fieldCode = `${
    (masters[ExactPath] as masterGeneralSettingsSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralSettingabs
    ]?.keyName
  }Code`;
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    // setFormData((prevData: any) => ({
    //   ...prevData,
    //   [`${
    //     SelectedMasterDatatab.charAt(0).toLowerCase() +
    //     SelectedMasterDatatab.slice(1)
    //   }Status`]: true,
    // }));
    console.log(formData);
    if (formData[fieldName].length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (formData[fieldCode].length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    const { id, email, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "subGroupCodesId",
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
    if (formData[fieldCode].length && formData[fieldName].length > 0) {
      try {
        const response = await api.put(
          `${
            (masters[ExactPath] as masterGeneralSettingsSubFields)[
              SelectedMasterDatatab as ValidMasterGeneralSettingabs
            ].update
          }/${id}`,
          filteredUserData
        );
        const data = await response.data;
        if (response.status === 200) {
          console.log(data);
          const objKey = dynamicFields.reduce((acc, item) => {
            acc[item.fieldName] = "";
            return acc;
          }, {} as Record<string, string>);

          setFormData((prev: any) => {
            return { [fieldName]: "", [fieldCode]: "", ...objKey };
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
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`${
        (masters[ExactPath] as masterGeneralSettingsSubFields)[
          SelectedMasterDatatab as ValidMasterGeneralSettingabs
        ]?.keyName
      }Status`]: true,
    }));
  };
  // const dynamicFieldRender={
  //   textField:
  // }
  const handleSelectChange = (e: SelectChangeEvent) => {
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
  const DwnValue = MainGroupDropDownData.find(
    (data) => data.value === formData?.mainGroupCodesId
  )?.label;
  const SubGrpDwnValue = SubGroupDropDownData.find(
    (data) => data.value === formData?.subGroupId
  )?.label;
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
            name={fieldName}
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
            name={fieldCode}
          />
          <NameSingleSelectDropdown
            value={DwnValue ? DwnValue : ""}
            onChange={handleSelectChange}
            options={MainGroupDropDownData}
            label={"Select MainGroup"}
            name="mainGroupCodesId"
          />
          <NameSingleSelectDropdown
            value={SubGrpDwnValue ? SubGrpDwnValue : ""}
            onChange={handleSelectChange}
            options={SubGroupDropDownData}
            label={"Select SubGroupCodes"}
            name="subGroupId"
          />
          <MasterDynamicFieldRender
            formData={formData}
            dynamicFields={dynamicFields}
            handleInputChange={handleInputChange}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSelectChange={handleSelectChange}
            dynFldErrValidation={dynFldErrValidation}
          />
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
