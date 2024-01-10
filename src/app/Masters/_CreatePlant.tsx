"use client";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import api from "@/components/api";
import { FormEvent, useState } from "react";

// Import statements...

export default function CreatePlant() {
  const [plantFormError, setplantFormError] = useState({
    name: false,
    code: false,
  });

  const [formData, setFormData] = useState({
    plantName: "",
    plantCode: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const PlantFormSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { plantName, plantCode } = formData;

    if (plantName.length === 0) {
      setplantFormError((prev) => ({ ...prev, name: true }));
    }
    if (plantCode.length === 0) {
      setplantFormError((prev) => ({ ...prev, code: true }));
    } else {
      setplantFormError((prev) => ({ name: false, code: false }));
    }
    if (plantCode.length > 0 && plantName.length > 0) {
      const response = await api.post("savePlant", {
        plantCode,
        plantName,
        status: true,
      });
      const data = await response.data;
      if (response.status === 201) {
        console.log(data);
        setFormData({
          plantName: "",
          plantCode: "",
        });
        setOpenSnackbar(true);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={PlantFormSubmitHandler}>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <OutlineTextField
            placeholder="Enter PlantName"
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
            placeholder="Enter PlantCode"
            type="text"
            value={formData.plantCode}
            onChange={handleInputChange}
            helperText={
              plantFormError.code ? "PlantCode Should not be empty" : ""
            }
            error={plantFormError.code}
            name="plantCode"
          />
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
