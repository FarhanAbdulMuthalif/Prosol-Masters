"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { validateField } from "@/utils/DynamicFields/DynamicFunction";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  PostCreateFieldData,
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../../../TypesStore";

// Import statements...

export default function CreateDepartmentMastert() {
  const [DepartmentFormError, setDepartmentFormError] = useState({
    name: false,
  });
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, setReusableSnackBar } = PlantDataCon;

  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
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
        console.log(e?.data?.message);
      }
    };
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab]);

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
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Name`;

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if (formData[fieldName] ? formData[fieldName].length === 0 : true) {
      setDepartmentFormError((prev) => ({ ...prev, name: true }));
      return null;
    } else {
      setDepartmentFormError((prev) => ({ name: false }));
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
    if (formData[fieldName] ? formData[fieldName].length > 0 : false) {
      try {
        const response = await api.post(
          `${
            (masters[ExactPath] as mastersPlantSubFields)[
              SelectedMasterDatatab as ValidMasterDataTabs
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
            return { [fieldName]: "", ...objKey };
          });
          setdynFldErrValidation({});
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} Created Sucessfully!`,
            open: true,
          }));
        }
      } catch (e: any) {
        console.log(e?.response);
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
              DepartmentFormError.name
                ? `${SelectedMasterDatatab}Name Should not be empty`
                : ""
            }
            error={DepartmentFormError.name}
            name={`${
              SelectedMasterDatatab.charAt(0).toLowerCase() +
              SelectedMasterDatatab.slice(1)
            }Name`}
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
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
