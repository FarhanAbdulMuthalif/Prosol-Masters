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
import { FormEvent, useContext, useState } from "react";

// Import statements...

export default function EditMasterWithDropdown({
  plantName,
  plantCode,
  id,
  status,
  createdAt,
  createdBy,
  updatedBy,
  updatedAt,
  plant,
}: {
  plantName: string;
  plantCode: string;
  id: number;
  status: boolean;
  createdAt: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  plant: Record<string, string | number>;
}) {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });

  const [formData, setFormData] = useState({
    plantName: plantName,
    plantCode: plantCode,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const PlantDataCon = useContext(UseContextHook);
  const { SelectedMasterDatatab } = PlantDataCon;
  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { plantName, plantCode } = formData;
    console.log(plantCode, plantName);
    if (plantName.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (plantCode.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    if (plantCode.length > 0 && plantName.length > 0) {
      const response = await api.put(`updatePlant/${id}`, {
        plantCode,
        plantName,
        status,
      });
      const data = await response.data;
      if (response.status === 200) {
        console.log(data);
        setFormData({
          plantName: "",
          plantCode: "",
        });
        setOpenSnackbar(true);
      }
    }
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const { data: originalArray } = useFetch("/plant/getAllPlant") ?? {
    data: [],
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
  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab}Name`}
            type="text"
            value={formData.plantName}
            onChange={handleInputChange}
            helperText={
              plantFormError.name ? "PlantName Should not be empty" : ""
            }
            error={plantFormError.name}
            name="plantName"
          />
          <OutlineTextField
            placeholder={`Enter ${SelectedMasterDatatab}Code`}
            type="text"
            value={formData.plantCode}
            onChange={handleInputChange}
            helperText={
              plantFormError.code ? "PlantCode Should not be empty" : ""
            }
            error={plantFormError.code}
            name="plantCode"
          />
          <SimpleDropdown
            value={plant.id}
            onChange={handleSelectChange}
            options={PlantDropDownData}
            label={"Select Plant"}
          />
        </div>
        <div className="edit-master-audit-trial-view">
          <div className="edit-master-audit-wrpr">
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Created By :</p>
              <p className="edit-master-audit-trial-label-value">{createdBy}</p>
            </div>
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Created At :</p>
              <p className="edit-master-audit-trial-label-value">{createdAt}</p>
            </div>
          </div>
          <div className="edit-master-audit-wrpr">
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Updated By :</p>
              <p className="edit-master-audit-trial-label-value">{updatedBy}</p>
            </div>
            <div className="edit-master-audit-trial-single-view">
              <p className="edit-master-audit-trial-label">Updated At :</p>
              <p className="edit-master-audit-trial-label-value">{updatedAt}</p>
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
