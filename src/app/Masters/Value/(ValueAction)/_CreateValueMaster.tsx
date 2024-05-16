"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
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
  PostCreateFieldData,
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

// Import statements...

export default function CreateValue() {
  const [plantFormError, setplantFormError] = useState({
    value: false,
    abbreviation: false,
  });
  const [formData, setFormData] = useState<any>({
    value: "",
    abbreviation: "",
  });

  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, setReusableSnackBar } = PlantDataCon;

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
  const { data: originalArray } = useFetch("/setting/getAllAttributeUom") ?? {
    data: [],
  };
  const attUomDropDownData = originalArray
    ? (originalArray as { id: number; attributeUomName: string }[]).map(
        ({ id, attributeUomName }) => ({
          value: id,
          label: attributeUomName,
        })
      )
    : [];

  if (!SelectedMasterDatatab || !attUomDropDownData || !setReusableSnackBar) {
    return null;
  }

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData["abbreviation"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, abbreviation: true }));
    }

    if (formData["value"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, value: true }));
    } else {
      setplantFormError((prev) => ({
        value: false,
        abbreviation: false,
      }));
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
    if (formData["value"]?.length > 0 && formData["abbreviation"]?.length > 0) {
      console.log(formData);
      try {
        const response = await api.post(
          `${(masters[ExactPath] as mastersVendorSubsubFields).create}`,
          formData
        );
        const data = await response.data;
        if (response.status === 201) {
          console.log(data);
          setFormData((prev: any) => {
            return { ["value"]: "", ["abbreviation"]: "" };
          });
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} updated Sucessfully!`,
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
    }));
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

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
  const DwnValue = attUomDropDownData.find(
    (data) => data.value === formData?.abbreviationUnit
  )?.label;
  const DwnValue2 = attUomDropDownData.find(
    (data) => data.value === formData?.equivalentUnit
  )?.label;
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
              {SelectedMasterDatatab}
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter Value`}
              type="text"
              value={formData ? formData["value"] : ""}
              onChange={handleInputChange}
              helperText={
                plantFormError.value ? `Value Should not be empty` : ""
              }
              error={plantFormError.value}
              name={`value`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Abbreviation
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter Abbreviation`}
              type="text"
              value={formData ? formData["abbreviation"] : ""}
              onChange={handleInputChange}
              helperText={
                plantFormError.abbreviation
                  ? `Abbreviation Should not be empty`
                  : ""
              }
              error={plantFormError.abbreviation}
              name={`abbreviation`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Likely Words
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter LikelyWords`}
              type="text"
              value={formData ? formData["likelyWords"] : ""}
              onChange={handleInputChange}
              name={`likelyWords`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Equivalent
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter Equivalent`}
              type="text"
              value={formData ? formData["equivalent"] : ""}
              onChange={handleInputChange}
              name={`equivalent`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select Abbreviation Unit
              <span>:</span>
            </TextComp>
            <NameSingleSelectDropdown
              value={DwnValue ? DwnValue : ""}
              onChange={handleSelectChange}
              options={attUomDropDownData}
              label={"Select Abbreviation Unit"}
              name="abbreviationUnit"
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              Select Equivalent Unit
              <span>:</span>
            </TextComp>
            <NameSingleSelectDropdown
              value={DwnValue2 ? DwnValue2 : ""}
              onChange={handleSelectChange}
              options={attUomDropDownData}
              label={"Select Equivalent Unit"}
              name="equivalentUnit"
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
