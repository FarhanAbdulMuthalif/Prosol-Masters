import useFetch from "@/Hooks/useFetch";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { CharacteristicSingleProps } from "../../../TypesStore";
import FillButton from "../Button/FillButton";
import OutlinedButton from "../Button/OutlineButton";
type ViewDialogProps = {
  open: boolean;
  handleClose: () => void;
  formData: CharacteristicSingleProps[];
  setFormData: Dispatch<SetStateAction<CharacteristicSingleProps[]>>;
  id: number;
};
export default function CreateTemplateValuesDialog({
  open,
  setFormData,
  formData,
  handleClose,
  id,
}: ViewDialogProps) {
  const { data: ValueMasteArray } = useFetch(
    "/value/getAllValue?attributeUom=false"
  ) ?? {
    data: [],
  };
  const ValueMasterDropDownData = ValueMasteArray
    ? (ValueMasteArray as { id: number; value: string }[]).map(
        ({ id, value }) => ({
          value: id,
          label: value,
        })
      )
    : [];
  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prevData) =>
      prevData.map((cData) =>
        cData.id === id
          ? {
              ...cData,
              valueId: checked
                ? [...(cData?.valueId || []), Number(value)] // Initialize to [] if cData?.valueId is undefined
                : cData?.valueId?.filter((e: number) => e !== Number(value)) ||
                  [], // Initialize to [] if cData?.valueId is undefined
            }
          : cData
      )
    );
  };
  const handleClearAndClose = () => {
    setFormData((prevData) =>
      prevData.map((cData) =>
        cData.id === id
          ? {
              ...cData,
              valueId: [], // Initialize to [] if cData?.valueId is undefined
            }
          : cData
      )
    );
    handleClose();
  };
  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ padding: "5px 10px" }}>
        <p style={{ color: "#6f6f6f", fontSize: "14px" }}>Select Value Types</p>
      </DialogTitle>
      <DialogContent dividers={true} sx={{ padding: "15px" }}>
        <div className="template-nm-uom-section">
          <div className="template-nm-uom-section-checkbox">
            {ValueMasterDropDownData.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    onChange={checkHandler}
                    checked={
                      formData
                        ?.find((Dtaid) => Dtaid.id === id)
                        ?.valueId?.includes(option.value) || false
                    }
                    value={option.value}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "12px",
                      margin: "0 ",
                    }}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: "5px 10px" }}>
        <OutlinedButton onClick={handleClearAndClose}>Close</OutlinedButton>
        <FillButton onClick={handleClose}>Save</FillButton>
      </DialogActions>
    </Dialog>
  );
}
