"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import RadioGroupComponent from "@/components/RadioButton/RadioGroup";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import api from "@/components/api";
import DynamicSingleSelectDropdown from "@/utils/DynamicFields/DynamicFieldDropdown";
import MultipleDynamicSelectDropdown from "@/utils/DynamicFields/MultipleDynamicSelectDropdown";
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
    name: false,
    short: false,
    address: false,
  });
  const [formData, setFormData] = useState<any>({
    attributeName: "",
    fieldType: "NUMERIC",
    listUom: [],
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);

  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters } = PlantDataCon;
  const checkHandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prev: any) => ({
        ...prev,
        privileges: [...prev.privileges, Number(value)],
      }));
    }

    // Case 2  : The user unchecks the box
    else {
      setFormData((prev: any) => ({
        ...prev,
        privileges: prev.privileges.filter((e: number) => e !== Number(value)),
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
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  if (!SelectedMasterDatatab) {
    return null;
  }

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData["shortDescName"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, short: true }));
    }

    if (formData["name"]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (formData["address"] < 1) {
      setplantFormError((prev) => ({ ...prev, address: true }));
    } else {
      setplantFormError((prev) => ({
        name: false,
        short: false,
        address: false,
      }));
    }
    if (formData["name"]?.length > 0 && formData["shortDescName"]?.length > 0) {
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
          setOpenSnackbar(true);
        }
      } catch (error: any) {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.data.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
      [`status`]: true,
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
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-Attribute-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter AttributeName`}
            type="text"
            value={formData ? formData["attributeName"] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.short ? `ShortDesc Should not be empty` : ""
            }
            error={plantFormError.short}
            name={`attributeName`}
          />

          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              gap: "5px",
            }}
          >
            <label style={{ fontSize: "12px", color: "#6f6f6f" }}>
              FieldType :{" "}
            </label>
            <MuiRadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              row
              onChange={handleInputChange}
              name="fieldType"
              value={formData["fieldType"]}
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                gap: "10px",
              }}
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
        <div className="master-attribute-uom-list">
          <p className="master-attribute-uom-list-text">UOM List</p>
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
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
      <ReusableSnackbar
        message={`${SelectedMasterDatatab} created Sucessfully!`}
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </form>
  );
}
