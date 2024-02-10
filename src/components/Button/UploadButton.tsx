import { UseContextHook } from "@/Provides/UseContextHook";
import { getAllPlantData } from "@/utils/masters/plant";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import {
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../TypesStore";
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
  const PlantDataCon = useContext(UseContextHook);
  const { setPlantData, masters, SelectedMasterDatatab, setReusableSnackBar } =
    PlantDataCon;
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  if (!setReusableSnackBar) {
    return null;
  }
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("jhkj");

    if (event.target.files && event.target?.files[0]) {
      const file = event?.target?.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await api.post(
          (masters[ExactPath] as mastersPlantSubFields)[
            SelectedMasterDatatab as ValidMasterDataTabs
          ].createBulk,
          formData
        );

        const dataPlant = await getAllPlantData(
          (masters[ExactPath] as mastersPlantSubFields)[
            SelectedMasterDatatab as ValidMasterDataTabs
          ].getAll
        );
        if (res.status === 200 || res.status === 201) {
          setReusableSnackBar((prev) => ({
            severity: "success",
            message: `${SelectedMasterDatatab} Bulk Created Sucessfully!`,
            open: true,
          }));
          if (setPlantData) {
            setPlantData(dataPlant);
          }
        }
      } catch (e: any) {
        console.log(e?.response);
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
        sx={{ whiteSpace: "nowrap" }}
      >
        Bulk Upload file
        <VisuallyHiddenInput onChange={handleFileUpload} type="file" />
      </Button>
    </>
  );
}
