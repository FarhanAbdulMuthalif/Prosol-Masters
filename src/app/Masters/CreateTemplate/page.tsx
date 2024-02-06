"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import { GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { mastersProps } from "../../../../TypesStore";

import useFetch from "@/Hooks/useFetch";
import OutlinedButton from "@/components/Button/OutlineButton";
import CustomRadioGroupComponent from "@/components/RadioButton/CustomRadioGroup";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import TextareaOutline from "@/components/Textfield/TextareaOutline";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import "./style.scss";

export default function Value() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [EditDataGet, setEditDataGet] = useState<any>({});
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    isConfirmationBulkDeleteDialogOpen,
    setConfirmationBulkDeleteDialogOpen,
  ] = useState(false);
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [formData, setFormData] = useState<any>();
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setConfirmationDeleteDialogOpen] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const HandlerCloseCreateDrawer = () => {
    setCreateDrawerOpen(false);
  };
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  const PlantDataCon = useContext(UseContextHook);
  const {
    setPlantData,
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    tabValue,
    settabValue,
    editTabShow,
  } = PlantDataCon;
  useEffect(() => {
    if (setSelectedMasterDatatab) {
      setSelectedMasterDatatab("CreateTemplate");
    }
  }, [setSelectedMasterDatatab]);
  const { data: originalArray } = useFetch("/setting/getAllNmUom") ?? {
    data: [],
  };
  const nmUomDropDownData = originalArray
    ? (originalArray as { id: number; nmUomName: string }[]).map(
        ({ id, nmUomName }) => ({
          value: id,
          label: nmUomName,
        })
      )
    : [];
  const auth = UseAuth();
  if (!auth || !nmUomDropDownData) {
    return null;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const checkHandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setFormData((prev: any) => ({
        ...prev,
        nmUoms: [...prev?.nmUoms, Number(value)],
      }));
    }

    // Case 2  : The user unchecks the box
    else {
      setFormData((prev: any) => ({
        ...prev,
        nmUoms: prev.nmUoms.filter((e: number) => e !== Number(value)),
      }));
    }
  };
  return (
    <section className="masters-vendor-main-content-section">
      <div className="masters-main-content-header">
        <p className="masters-main-content-header-text">
          {SelectedMasterDatatab}
        </p>
        <div className="export-import-header-master-div">
          <FillButton
            onClick={() => {
              setCreateDrawerOpen(true);
            }}
          >
            Add Fields
          </FillButton>
        </div>
      </div>
      <div className="create-plant-wrapper-div">
        <div className="create-plant-field-place-div">
          <Autocomplete
            options={["bold", "bearing"]}
            forcePopupIcon={false}
            autoHighlight
            fullWidth
            renderOption={(props, option: string) => (
              <li
                style={{
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
                {...props}
              >
                {option}
              </li>
            )}
            renderInput={(params) => (
              <OutlineTextField
                {...params}
                placeholder={`Enter Noun`}
                type="text"
                value={formData ? formData["noun"] : ""}
                onChange={handleInputChange}
                name={`noun`}
                size="small"
              />
            )}
          />
          <Autocomplete
            options={["bold", "bearing"]}
            forcePopupIcon={false}
            autoHighlight
            fullWidth
            renderOption={(props, option: string) => (
              <li
                style={{
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
                {...props}
              >
                {option}
              </li>
            )}
            renderInput={(params) => (
              <OutlineTextField
                {...params}
                placeholder={`Enter Modifier`}
                type="text"
                value={formData ? formData["modifier"] : ""}
                onChange={handleInputChange}
                name={`modifier`}
                size="small"
              />
            )}
          />

          <OutlineTextField
            placeholder={`Enter Noun Synonyms`}
            type="text"
            value={formData ? formData["nounSynonyms"] : ""}
            onChange={handleInputChange}
            name={`nounSynonyms`}
          />
          <OutlineTextField
            placeholder={`Enter Modifier Synonyms`}
            type="text"
            value={formData ? formData["modifierSynonyms"] : ""}
            onChange={handleInputChange}
            name={`modifierSynonyms`}
          />

          <OutlineTextField
            placeholder={`Enter Similar SearchItems`}
            type="text"
            value={formData ? formData["similarSearchItems"] : ""}
            onChange={handleInputChange}
            name={`similarSearchItems`}
          />

          <CustomRadioGroupComponent
            label=""
            name="type"
            options={["OEM", "OPM", "GENERIC"]}
            value={formData ? formData["type"] : ""}
            onChange={handleInputChange}
          />
          <TextareaOutline
            placeholder={`Enter NM Definition`}
            type="text"
            value={formData ? formData["nmDefinition"] : ""}
            onChange={handleInputChange}
            name={`nmDefinition`}
            rows={2}
          />
        </div>
        <div className="template-nm-uom-section">
          <p className="template-nm-uom-section-text">Select UOM</p>
          <div className="template-nm-uom-section-checkbox">
            {nmUomDropDownData.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    onChange={checkHandler2}
                    checked={formData?.nmUoms?.includes(option.value)}
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
        <div className="create-plant-action-div">
          <OutlinedButton>CLEAR</OutlinedButton>
          <FillButton type="submit">SUBMIT</FillButton>
        </div>
      </div>

      <CreateDreawer
        OpenDrawer={CreateDrawerOpen}
        HandlerCloseDrawer={HandlerCloseCreateDrawer}
      />
    </section>
  );
}
