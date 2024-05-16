"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { validateField } from "@/utils/DynamicFields/DynamicFunction";
import { textCompStyle } from "@/utils/UserDataExport";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  PostCreateFieldData,
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

// Import statements...

export default function CreateAttribute() {
  const [plantFormError, setplantFormError] = useState({
    attributeName: false,
    fieldType: false,
    listUom: false,
  });
  const [formData, setFormData] = useState<any>({
    attributeName: "",
    fieldType: "NUMERIC",
    listUom: [],
  });

  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, setReusableSnackBar } = PlantDataCon;
  const checkHandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prev: any) => ({
        ...prev,
        listUom: [...prev?.listUom, Number(value)],
      }));
    }

    // Case 2  : The user unchecks the box
    else {
      setFormData((prev: any) => ({
        ...prev,
        listUom: prev.listUom.filter((e: number) => e !== Number(value)),
      }));
    }
  };
  const { data: originalArray } = useFetch("/setting/getAllAttributeUom") ?? {
    data: [],
  };
  const MainGroupDropDownData = originalArray
    ? (originalArray as { id: number; attributeUomName: string }[]).map(
        ({ id, attributeUomName }) => ({
          value: id,
          label: attributeUomName,
        })
      )
    : [];
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
  if (!SelectedMasterDatatab || !setReusableSnackBar) {
    return null;
  }

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData["attributeName"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, attributeName: true }));
    }

    if (formData["fieldType"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, fieldType: true }));
    }
    if (formData["listUom"].length < 1) {
      setplantFormError((prev) => ({ ...prev, listUom: true }));
    } else {
      setplantFormError((prev) => ({
        listUom: false,
        attributeName: false,
        fieldType: false,
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
    if (
      formData["attributeName"]?.length > 0 &&
      formData["fieldType"]?.length > 0
    ) {
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
            return { ["name"]: "", ["shortDescName"]: "" };
          });
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} Created Sucessfully!`,
            open: true,
          }));
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
  function clearFormValues() {
    setFormData({
      attributeName: "",
      fieldType: "NUMERIC",
      listUom: [],
    });
  }
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-Attribute-wrapper-div">
        <div className="create-plant-field-place-div">
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              {SelectedMasterDatatab} Name
              <span>:</span>
            </TextComp>
            <OutlineTextField
              fullWidth
              placeholder={`Enter AttributeName`}
              type="text"
              value={formData ? formData["attributeName"] : ""}
              onChange={handleInputChange}
              helperText={
                plantFormError.attributeName
                  ? `ShortDesc Should not be empty`
                  : ""
              }
              error={plantFormError.attributeName}
              name={`attributeName`}
            />
          </div>
          <div className="create-plant-wrapper-single-input">
            <TextComp variant="subTitle" style={textCompStyle}>
              FieldType <span>:</span>
            </TextComp>
            <FormControl>
              <MuiRadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                row
                onChange={handleInputChange}
                name="fieldType"
                value={formData["fieldType"]}
                // sx={{
                //   display: "flex",
                //   alignItems: "center",
                //   height: "100%",
                //   gap: "10px",
                // }}
              >
                {["NUMERIC", "AlphaNumeric"].map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio size="small" />}
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "12px",
                          margin: "0 ",
                        }}
                      >
                        {option}
                      </Typography>
                    }
                  />
                ))}
              </MuiRadioGroup>
            </FormControl>
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
        <div className="master-attribute-uom-list">
          <TextComp
            variant="subTitle"
            style={{ fontWeight: "bold", color: PrimaryTextColor }}
          >
            UOM List
          </TextComp>
          <div className="master-attribute-uom-list-grid">
            {MainGroupDropDownData.map((data) => {
              return (
                <FormControlLabel
                  key={data.value}
                  control={
                    <Checkbox
                      onChange={checkHandler2}
                      checked={formData?.listUom?.includes(data.value)}
                      value={data.value}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "12px", color: "#71747A" }}>
                      {data.label}
                    </Typography>
                  }
                />
              );
            })}
          </div>
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton onClick={clearFormValues}>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
