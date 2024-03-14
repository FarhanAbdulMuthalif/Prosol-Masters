"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
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
  PostCreateFieldData,
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

// Import statements...

export default function CreateVendor() {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    short: false,
    address: false,
  });
  const [formData, setFormData] = useState<any>({
    shortDescName: "",
    name: "",
    address: "",
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
  if (!SelectedMasterDatatab || !setReusableSnackBar) {
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
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ShortDesc`}
            type="text"
            value={formData ? formData["shortDescName"] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.short ? `ShortDesc Should not be empty` : ""
            }
            error={plantFormError.short}
            name={`shortDescName`}
          />
          <OutlineTextField
            placeholder={`Enter Name`}
            type="text"
            value={formData ? formData["name"] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.name ? `Vendor Name Should not be empty` : ""
            }
            error={plantFormError.name}
            name={`name`}
          />
          <OutlineTextField
            placeholder={`Enter Name2`}
            type="text"
            value={formData ? formData["name2"] : ""}
            onChange={handleInputChange}
            name={`name2`}
          />
          <OutlineTextField
            placeholder={`Enter Name3`}
            type="text"
            value={formData ? formData["name3"] : ""}
            onChange={handleInputChange}
            name={`name3`}
          />
          <OutlineTextField
            placeholder={`Enter Name4`}
            type="text"
            value={formData ? formData["name4"] : ""}
            onChange={handleInputChange}
            name={`name4`}
          />
          <OutlineTextField
            placeholder={`Enter address`}
            type="text"
            value={formData ? formData["address"] : ""}
            onChange={handleInputChange}
            helperText={
              plantFormError.address ? `Address Should not be empty` : ""
            }
            error={plantFormError.address}
            name={`address`}
          />
          <OutlineTextField
            placeholder={`Enter Address2`}
            type="text"
            value={formData ? formData["address2"] : ""}
            onChange={handleInputChange}
            name={`address2`}
          />
          <OutlineTextField
            placeholder={`Enter Address3`}
            type="text"
            value={formData ? formData["address3"] : ""}
            onChange={handleInputChange}
            name={`address3`}
          />
          <OutlineTextField
            placeholder={`Enter Address4`}
            type="text"
            value={formData ? formData["address4"] : ""}
            onChange={handleInputChange}
            name={`address4`}
          />
          <OutlineTextField
            placeholder={`Enter City`}
            type="text"
            value={formData ? formData["city"] : ""}
            onChange={handleInputChange}
            name={`city`}
          />
          <OutlineTextField
            placeholder={`Enter State`}
            type="text"
            value={formData ? formData["state"] : ""}
            onChange={handleInputChange}
            name={`state`}
          />
          <OutlineTextField
            placeholder={`Enter Country`}
            type="text"
            value={formData ? formData["country"] : ""}
            onChange={handleInputChange}
            name={`country`}
          />
          <OutlineTextField
            placeholder={`Enter PostalCode`}
            type="text"
            value={formData ? formData["postalCode"] : ""}
            onChange={handleInputChange}
            name={`postalCode`}
          />
          <OutlineTextField
            placeholder={`Enter TelephoneNo`}
            type="text"
            value={formData ? formData["telephoneNo"] : ""}
            onChange={handleInputChange}
            name={`telephoneNo`}
          />
          <OutlineTextField
            placeholder={`Enter Fax`}
            type="text"
            value={formData ? formData["fax"] : ""}
            onChange={handleInputChange}
            name={`fax`}
          />
          <OutlineTextField
            placeholder={`Enter MobileNo`}
            type="text"
            value={formData ? formData["mobileNo"] : ""}
            onChange={handleInputChange}
            name={`mobileNo`}
          />
          <OutlineTextField
            placeholder={`Enter Email`}
            type="text"
            value={formData ? formData["email"] : ""}
            onChange={handleInputChange}
            name={`email`}
          />
          <OutlineTextField
            placeholder={`Enter Website`}
            type="text"
            value={formData ? formData["website"] : ""}
            onChange={handleInputChange}
            name={`website`}
          />
          <OutlineTextField
            placeholder={`Enter AcquriedBy`}
            type="text"
            value={formData ? formData["acquriedBy"] : ""}
            onChange={handleInputChange}
            name={`acquiredBy`}
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
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>
    </form>
  );
}
