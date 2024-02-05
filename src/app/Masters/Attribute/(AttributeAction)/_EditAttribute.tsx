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
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

// Import statements...

export default function EditAttribute({ EditDataGet }: any) {
  const [VendorFormError, setVendorFormError] = useState({
    attributeName: false,
    fieldType: false,
    listUom: false,
  });
  // const { id, updatedAt, updatedBy, createdBy, createdAt } = EditDataGet;

  const PlantDataCon = useContext(UseContextHook);
  const { masters, SelectedMasterDatatab, settabValue } = PlantDataCon;
  const [formData, setFormData] = useState<any>(EditDataGet);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  useEffect(() => {
    setFormData((prev: any) => {
      return {
        ...prev,
        ...prev,
        listUom: EditDataGet.listUom.map((data: any) => data.id),
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
        console.log(e?.data?.message);
      }
    };
    dynamicFormFieldHandler();
  }, [SelectedMasterDatatab, EditDataGet.listUom]);
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
  if (!SelectedMasterDatatab || !settabValue) {
    return null;
  }
  const MainGroupDropDownData = originalArray
    ? (originalArray as { id: number; attributeUomName: string }[]).map(
        ({ id, attributeUomName }) => ({
          value: id,
          label: attributeUomName,
        })
      )
    : [];
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
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData["attributeName"]?.length === 0) {
      setVendorFormError((prev) => ({ ...prev, attributeName: true }));
    }

    if (formData["fieldType"]?.length === 0) {
      setVendorFormError((prev) => ({ ...prev, fieldType: true }));
    }
    if (formData["listUom"].length < 1) {
      setVendorFormError((prev) => ({ ...prev, listUom: true }));
    } else {
      setVendorFormError((prev) => ({
        listUom: false,
        attributeName: false,
        fieldType: false,
      }));
    }
    const { id, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemoveEditMaster[] = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete filteredUserData[key]);
    if (
      formData["attributeName"]?.length > 0 &&
      formData["fieldType"]?.length > 0
    ) {
      try {
        const response = await api.put(
          `${(masters[ExactPath] as mastersVendorSubsubFields).update}/${id}`,
          filteredUserData
        );
        const data = await response.data;
        if (response.status === 200) {
          console.log(data);
          setFormData({});
          setOpenSnackbar(true);
          settabValue("table");
        }
      } catch (e: any) {
        console.log(e?.response);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
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
      <div className="create-Attribute-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter AttributeName`}
            type="text"
            value={formData ? formData["attributeName"] : ""}
            onChange={handleInputChange}
            helperText={
              VendorFormError.attributeName
                ? `ShortDesc Should not be empty`
                : ""
            }
            error={VendorFormError.attributeName}
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
                    onChange={handleSelectChange}
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
        <div className="edit-master-audit-trial-view">
          <div className="edit-master-audit-wrpr">
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Created By :</p>
              <p className="edit-master-audit-trial-label-value">
                {formData.createdBy}
              </p>
            </div>
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Created At :</p>
              <p className="edit-master-audit-trial-label-value">
                {formData.createdAt}
              </p>
            </div>
          </div>
          <div className="edit-master-audit-wrpr">
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Updated By :</p>
              <p className="edit-master-audit-trial-label-value">
                {formData.updatedBy}
              </p>
            </div>
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Updated At :</p>
              <p className="edit-master-audit-trial-label-value">
                {formData.updatedAt}
              </p>
            </div>
          </div>
        </div>
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
      <ReusableSnackbar
        message={`${SelectedMasterDatatab} updated Sucessfully!`}
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </form>
  );
}
