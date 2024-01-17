import { UseContextHook } from "@/Provides/UseContextHook";
import { getAllPlantData } from "@/utils/masters/plant";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useState } from "react";
import ReusableSnackbar from "../Snackbar/Snackbar";
import api from "../api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [AllPlant, setAllPlant] = useState([]);
  const PlantDataCon = useContext(UseContextHook);
  const { setPlantData } = PlantDataCon;
  const getPlantfunct = async () => {
    const dataPlant = await getAllPlantData("getAllPlant");
    setAllPlant(dataPlant);
  };
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("jhkj");
    if (event.target.files && event.target?.files[0]) {
      const file = event?.target?.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post("/ImportExcelDataPlant", formData);

      const dataPlant = await getAllPlantData("getAllPlant");
      if (res.status === 200 || res.status === 201) {
        setOpenSnackbar(true);
        if (setPlantData) {
          setPlantData(dataPlant);
        }
      }
    }
  };
  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        size="small"
      >
        Bulk Upload file
        <VisuallyHiddenInput onChange={handleFileUpload} type="file" />
      </Button>
      <ReusableSnackbar
        message="Plant Deleted Sucessfully!"
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </>
  );
}
