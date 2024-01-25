"use client";
import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import SimpleDropdown from "@/components/Dropdown/SimpleDropdown";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { SelectChangeEvent } from "@mui/material";
import { usePathname } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ValidMasterDataTabs, mastersProps } from "../../../TypesStore";

// Import statements...
type KeysToRemove =
  | "createdAt"
  | "createdBy"
  | "updatedAt"
  | "updatedBy"
  | "plant";

export default function EditMasterWithDropdown({ EditDataGet }: any) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });

  const [formData, setFormData] = useState<any>(EditDataGet);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab, masters, settabValue } = PlantDataCon;
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  useEffect(() => {
    setFormData((prev: any) => ({ ...prev, plantId: prev?.plant?.id }));
  }, []);
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
  const fieldName = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Name`;
  const fieldCode = `${
    SelectedMasterDatatab.charAt(0).toLowerCase() +
    SelectedMasterDatatab.slice(1)
  }Code`;
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (formData[fieldName]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (formData[fieldCode]?.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    const { id, email, ...filteredData } = formData;

    // List of keys to be removed
    const keysToRemove: KeysToRemove[] = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "plant",
    ];

    // Create a new object by filtering out specified keys
    const filteredUserData = { ...filteredData };

    keysToRemove.forEach((key) => delete filteredUserData[key]);
    if (formData[fieldCode]?.length && formData[fieldName]?.length > 0) {
      const response = await api.put(
        `${
          masters[ExactPath][SelectedMasterDatatab as ValidMasterDataTabs]
            .update
        }/${id}`,
        filteredUserData
      );
      const data = await response.data;
      if (response.status === 200) {
        console.log(data);
        setOpenSnackbar(true);
        settabValue("table");
      }
    }
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, plantId: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const PlantDropDownData = originalArray
    ? (originalArray as { id: number; plantName: string }[]).map(
        ({ id, plantName }) => ({
          value: id,
          label: plantName,
        })
      )
    : [];
  if (!PlantDropDownData) {
    return null;
  }
  const DwnValue = PlantDropDownData.find(
    (data) => data.value === formData.plantId
  )?.label;
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Name`}
            type="text"
            value={formData[fieldName]}
            onChange={handleInputChange}
            helperText={
              plantFormError.name
                ? `${SelectedMasterDatatab}Name Should not be empty`
                : ""
            }
            error={plantFormError.name}
            name={fieldName}
          />
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab} Code`}
            type="text"
            value={formData[fieldCode]}
            onChange={handleInputChange}
            helperText={
              plantFormError.code
                ? `${SelectedMasterDatatab}Code Should not be empty`
                : ""
            }
            error={plantFormError.code}
            name={fieldCode}
          />
          <SimpleDropdown
            value={DwnValue ? DwnValue : ""}
            onChange={handleSelectChange}
            options={PlantDropDownData}
            label={"Select Plant"}
          />
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
        message="Plant created Sucessfully!"
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </form>
  );
}
