import { UseContextHook } from "@/Provides/UseContextHook";
import { PrimaryTextColor } from "@/styles/colorsCode";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AttributeMasterSingle,
  CharacteristicSingleProps,
} from "../../../TypesStore";
import FillButton from "../Button/FillButton";
import OutlinedButton from "../Button/OutlineButton";
import TextComp from "../TextComp/TextComp";
import api from "../api";
type ViewDialogProps = {
  open: boolean;
  handleClose: () => void;
  formData: CharacteristicSingleProps[];
  setFormData: Dispatch<SetStateAction<CharacteristicSingleProps[]>>;
  id: number;
  CharacteristicDwnValueId: number;
};
export default function CreateTemplateAttributeUOMDialog({
  open,
  setFormData,
  formData,
  handleClose,
  id,
  CharacteristicDwnValueId,
}: ViewDialogProps) {
  const [CheckBoxData, setCheckBoxData] = useState<AttributeMasterSingle>({
    id: 0,
    attributeName: "",
    fieldType: "",
    listUom: [
      {
        id: 0,
        attributeUomName: "Att1",
        attributeUnit: "",
        attributeUomStatus: false,
        createdBy: "",
        updatedBy: "",
        createdAt: "",
        updatedAt: "",
      },
    ],
    createdBy: "",
    updatedBy: "",
    createdAt: "",
    updatedAt: "",
  });
  const ContextDataHub = useContext(UseContextHook);
  const { setReusableSnackBar } = ContextDataHub;

  useEffect(() => {
    if (CharacteristicDwnValueId === 0) return;
    async function asyncCall() {
      try {
        const res = await api.get(
          `/attribute/getAttributeMasterById/${CharacteristicDwnValueId}?showFull=true`
        );
        const data = await res.data;
        if (res.status === 200) {
          setCheckBoxData(data);
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
    asyncCall();
  }, [CharacteristicDwnValueId, setReusableSnackBar]);
  const ValueMasterDropDownData = CheckBoxData.listUom
    ? (CheckBoxData.listUom as { id: number; attributeUomName: string }[]).map(
        ({ id, attributeUomName }) => ({
          value: id,
          label: attributeUomName,
        })
      )
    : [];
  const checkHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    console.log(formData);
    setFormData((prevData) =>
      prevData.map((cData) =>
        cData.id === id
          ? {
              ...cData,
              attrUomId: checked
                ? [...(cData?.attrUomId || []), Number(value)] // Initialize to [] if cData?.attrUomId is undefined
                : cData?.attrUomId?.filter(
                    (e: number) => e !== Number(value)
                  ) || [], // Initialize to [] if cData?.attrUomId is undefined
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
              attrUomId: [], // Initialize to [] if cData?.attrUomId is undefined
            }
          : cData
      )
    );
    handleClose();
  };
  return (
    <Dialog maxWidth="sm" fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ padding: "5px 10px" }}>
        <TextComp
          variant="subTitle"
          style={{ color: PrimaryTextColor, textTransform: "uppercase" }}
        >
          Select UOM
        </TextComp>
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
                        ?.attrUomId?.includes(option.value) || false
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
