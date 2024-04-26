"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
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
  PostCreateFieldData,
  ValidMasterGeneralSettingabs,
  masterGeneralSettingsSubFields,
  mastersProps,
} from "../../../../../TypesStore";

// Import statements...

export default function CreateGeneralSetting() {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, setReusableSnackBar } = PlantDataCon;

  const [formData, setFormData] = useState<any>({});
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
  if (!SelectedMasterDatatab || !setReusableSnackBar) {
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
        const response = await api.post(
          `${
            (masters[ExactPath] as masterGeneralSettingsSubFields)[
              SelectedMasterDatatab as ValidMasterGeneralSettingabs
            ].create
          }`,
          formData
        );
        const data = await response.data;
        if (response.status === 201) {
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
            message: `${SelectedMasterDatatab} Created Sucessfully!`,
            open: true,
          }));
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
  function clearFormValues<T extends object>(data: T) {
    if (typeof data !== "object" || data === null) {
      setFormData({} as { [K in keyof T]: string });
    }

    const clearedData: { [K in keyof T]: string } = Object.keys(data).reduce(
      (acc, key) => {
        acc[key as keyof T] = ""; // Set every value to an empty string
        return acc;
      },
      {} as { [K in keyof T]: string }
    );

    setFormData(clearedData);
  }
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Enter {SelectedMasterDatatab} Name
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
              name={fieldName}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Enter {SelectedMasterDatatab} Code
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
              name={fieldCode}
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
              clearFormValues(formData);
            }}
          >
            CLEAR
          </OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
