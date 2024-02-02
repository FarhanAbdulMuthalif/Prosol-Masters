"use client";
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
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import {
  KeysToRemoveEditMaster,
  PostCreateFieldData,
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

// Import statements...

export default function EditVendor({ EditDataGet }: any) {
  const [VendorFormError, setVendorFormError] = useState({
    name: false,
    short: false,
    address: false,
  });
  // const { id, updatedAt, updatedBy, createdBy, createdAt } = EditDataGet;

  const PlantDataCon = useContext(UseContextHook);
  const { masters, SelectedMasterDatatab, settabValue } = PlantDataCon;
  const [formData, setFormData] = useState<any>(EditDataGet);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
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
  if (!SelectedMasterDatatab || !settabValue) {
    return null;
  }

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData["shortDescName"]?.length === 0) {
      setVendorFormError((prev) => ({ ...prev, short: true }));
    }

    if (formData["name"]?.length === 0) {
      setVendorFormError((prev) => ({ ...prev, name: true }));
    }
    if (formData["address"] < 1) {
      setVendorFormError((prev) => ({ ...prev, address: true }));
    } else {
      setVendorFormError((prev) => ({
        name: false,
        short: false,
        address: false,
      }));
    }
    const { id, email, ...filteredData } = formData;

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
    if (formData["name"]?.length > 0 && formData["shortDescName"]?.length > 0) {
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
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ShortDesc`}
            type="text"
            value={formData ? formData["shortDescName"] : ""}
            onChange={handleInputChange}
            helperText={
              VendorFormError.short ? `ShortDesc Should not be empty` : ""
            }
            error={VendorFormError.short}
            name={`shortDescName`}
          />
          <OutlineTextField
            placeholder={`Enter Name`}
            type="text"
            value={formData ? formData["name"] : ""}
            onChange={handleInputChange}
            helperText={
              VendorFormError.name ? `Vendor Name Should not be empty` : ""
            }
            error={VendorFormError.name}
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
              VendorFormError.address ? `Address Should not be empty` : ""
            }
            error={VendorFormError.address}
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
            name={`acquriedBy`}
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
