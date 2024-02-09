"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import MasterAuditTrial from "@/components/AuditTrial/MasterAudit/MasterAuditTrial";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import NameSingleSelectDropdown from "@/components/Dropdown/NameSingleDropdown";
import MasterDynamicFieldRender from "@/components/Dynamic/MasterDynamicFieldRender";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
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

export default function EditValueMastre({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    value: false,
    abbreviation: false,
  });
  // const { id, updatedAt, updatedBy, createdBy, createdAt } = EditDataGet;

  const PlantDataCon = useContext(UseContextHook);
  const { masters, SelectedMasterDatatab, settabValue } = PlantDataCon;
  const [formData, setFormData] = useState<any>(EditDataGet);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dynamicFields, setdynamicFields] = useState<PostCreateFieldData[]>([]);
  useEffect(() => {
    setFormData((data: any) => {
      return {
        ...data,
        abbreviationUnit: EditDataGet?.abbreviationUnit?.id,
        equivalentUnit: EditDataGet?.equivalentUnit?.id,
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
  }, [SelectedMasterDatatab, EditDataGet]);
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

  if (!SelectedMasterDatatab || !attUomDropDownData || !settabValue) {
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
    if (formData["value"]?.length > 0 && formData["abbreviation"]?.length > 0) {
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
  const DwnValue = attUomDropDownData.find(
    (data) => data.value === formData?.abbreviationUnit
  )?.label;
  const DwnValue2 = attUomDropDownData.find(
    (data) => data.value === formData?.equivalentUnit
  )?.label;
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div-edit-vendor">
          <OutlineTextField
            placeholder={`Enter Value`}
            type="text"
            value={formData ? formData["value"] : ""}
            onChange={handleInputChange}
            helperText={plantFormError.value ? `Value Should not be empty` : ""}
            error={plantFormError.value}
            name={`value`}
          />
          <OutlineTextField
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
          <OutlineTextField
            placeholder={`Enter LikelyWords`}
            type="text"
            value={formData ? formData["likelyWords"] : ""}
            onChange={handleInputChange}
            name={`likelyWords`}
          />
          <OutlineTextField
            placeholder={`Enter Equivalent`}
            type="text"
            value={formData ? formData["equivalent"] : ""}
            onChange={handleInputChange}
            name={`equivalent`}
          />
          <NameSingleSelectDropdown
            value={DwnValue ? DwnValue : ""}
            onChange={handleSelectChange}
            options={attUomDropDownData}
            label={"Select Abbreviation Unit"}
            name="abbreviationUnit"
          />
          <NameSingleSelectDropdown
            value={DwnValue2 ? DwnValue2 : ""}
            onChange={handleSelectChange}
            options={attUomDropDownData}
            label={"Select Equivalent Unit"}
            name="equivalentUnit"
          />
          <MasterDynamicFieldRender
            formData={formData}
            dynamicFields={dynamicFields}
            handleInputChange={handleInputChange}
            handleMultiSelectChange={handleMultiSelectChange}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <MasterAuditTrial formData={formData}></MasterAuditTrial>
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
