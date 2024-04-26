"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import ColoredTabs from "@/components/Tabs/ColoredTabs";
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
  const [tabValue, settabValue] = useState("personal");
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
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "additional" | "personal"
  ) => {
    settabValue(newValue);
  };
  const tabs = [
    { label: `Personal Info`, value: "personal" },
    {
      label: `Additional Info`,
      value: "additional",
    },
  ];
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div-vendor">
        <ColoredTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></ColoredTabs>
        <div className="create-plant-field-place-div-vendor">
          {tabValue === "personal" ? (
            <>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter ShortDesc
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
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
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Name
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
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
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Address
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
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
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter City
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter City`}
                  type="text"
                  value={formData ? formData["city"] : ""}
                  onChange={handleInputChange}
                  name={`city`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter State
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter State`}
                  type="text"
                  value={formData ? formData["state"] : ""}
                  onChange={handleInputChange}
                  name={`state`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Country
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Country`}
                  type="text"
                  value={formData ? formData["country"] : ""}
                  onChange={handleInputChange}
                  name={`country`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Postal Code
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter PostalCode`}
                  type="text"
                  value={formData ? formData["postalCode"] : ""}
                  onChange={handleInputChange}
                  name={`postalCode`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter MobileNo
                  <span>:</span>
                </TextComp>

                <OutlineTextField
                  fullWidth
                  placeholder={`Enter MobileNo`}
                  type="text"
                  value={formData ? formData["mobileNo"] : ""}
                  onChange={handleInputChange}
                  name={`mobileNo`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Email
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Email`}
                  type="text"
                  value={formData ? formData["email"] : ""}
                  onChange={handleInputChange}
                  name={`email`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter AcquiredBy
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter AcquriedBy`}
                  type="text"
                  value={formData ? formData["acquiredBy"] : ""}
                  onChange={handleInputChange}
                  name={`acquiredBy`}
                />
              </div>
            </>
          ) : (
            <>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Name2
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Name2`}
                  type="text"
                  value={formData ? formData["name2"] : ""}
                  onChange={handleInputChange}
                  name={`name2`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Name3
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Name3`}
                  type="text"
                  value={formData ? formData["name3"] : ""}
                  onChange={handleInputChange}
                  name={`name3`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Name4
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Name4`}
                  type="text"
                  value={formData ? formData["name4"] : ""}
                  onChange={handleInputChange}
                  name={`name4`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Address2
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Address2`}
                  type="text"
                  value={formData ? formData["address2"] : ""}
                  onChange={handleInputChange}
                  name={`address2`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Address3
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Address3`}
                  type="text"
                  value={formData ? formData["address3"] : ""}
                  onChange={handleInputChange}
                  name={`address3`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Address4
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Address4`}
                  type="text"
                  value={formData ? formData["address4"] : ""}
                  onChange={handleInputChange}
                  name={`address4`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Website
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Website`}
                  type="text"
                  value={formData ? formData["website"] : ""}
                  onChange={handleInputChange}
                  name={`website`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Fax
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter Fax`}
                  type="text"
                  value={formData ? formData["fax"] : ""}
                  onChange={handleInputChange}
                  name={`fax`}
                />
              </div>
              <div className="create-plant-wrapper-single-input">
                <TextComp variant="subTitle" style={textCompStyle}>
                  Enter Telephone No
                  <span>:</span>
                </TextComp>
                <OutlineTextField
                  fullWidth
                  placeholder={`Enter TelephoneNo`}
                  type="text"
                  value={formData ? formData["telephoneNo"] : ""}
                  onChange={handleInputChange}
                  name={`telephoneNo`}
                />
              </div>
            </>
          )}

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
          {tabValue !== "personal" ? (
            <>
              <FillButton
                onClick={() => {
                  settabValue("personal");
                }}
              >
                BACK
              </FillButton>
              <FillButton type="submit">SUBMIT</FillButton>
            </>
          ) : (
            ""
          )}
          {tabValue === "personal" ? (
            <FillButton
              onClick={() => {
                settabValue("additional");
              }}
            >
              Next
            </FillButton>
          ) : (
            ""
          )}
        </div>
      </div>
    </form>
  );
}
