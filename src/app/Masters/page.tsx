"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import CustomTabs from "@/components/Tabs/Tabs";
import api, { URL_FIX_BASE_PATH } from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Menu, MenuItem } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { MouseEvent, ReactNode, useContext, useState } from "react";
import CreatePlant from "./_CreatePlant";
import Plantgrid from "./_Plantgrid";
import "./style.scss";

export default function Masters() {
  const [tabValue, settabValue] = useState("table");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    settabValue(newValue);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const tabs = [
    { label: "Plant Table", value: "table" },
    { label: "Create Plant", value: "create" },
  ];
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const PlantDataCon = useContext(UseContextHook);
  const { setPlantData } = PlantDataCon;
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(!isConfirmationDialogOpen);
  };
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setConfirmationDeleteDialogOpen] =
    useState(false);
  const handleOpenConfirmationDeleteDialog = () => {
    setConfirmationDeleteDialogOpen(false);
  };
  const GetIdandOpenHandler = (val: number) => {
    setConfirmationDeleteDialogOpen(true);
    setselectedId(val);
  };
  const handlePlantDeleteHandler = async () => {
    try {
      const res = await api.delete(`deletePlant/${selectedId}`);
      const data = await res.data;
      if (res.status === 200) {
        setOpenSnackbar(true);
        setConfirmationDeleteDialogOpen(false);
      }
    } catch (e) {
      console.log(e);
      // console.log(e.ma)
    }
  };
  const tabRenderValuePlant: Record<string, ReactNode> = {
    table: (
      <Plantgrid
        selectionIDArr={setSelectionIDArr}
        handleOpenConfirmationDeleteDialog={GetIdandOpenHandler}
      />
    ),
    create: <CreatePlant />,
  };

  const handlePlantBulkStatusChangeAction = async () => {
    const res = await api.patch(
      `updateBulkStatusPlantId/${selectionIDArr.toString()}`
    );
    const dataPlantUpdate = await res.data;
    const dataPlant = await getAllPlantData("getAllPlant");
    console.log(dataPlant);
    console.log(dataPlantUpdate);
    if (res.status === 200) {
      setConfirmationDialogOpen(false);
      if (setPlantData) {
        setPlantData(dataPlant);
        setConfirmationDeleteDialogOpen(false);
      }
    }
  };

  return (
    <section className="masters-main-content-section">
      <div className="masters-main-content-header">
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></CustomTabs>
        <div className="export-import-header-master-div">
          {selectionIDArr.length > 0 ? (
            <PublishedWithChangesIcon
              sx={{ color: "#1976D2" }}
              onClick={handleOpenConfirmationDialog}
            />
          ) : (
            ""
          )}
          <OutlinedButton startIcon={<FileDownloadIcon />}>
            <a href={`${URL_FIX_BASE_PATH}/exportTemplatePlant`}>
              Download Template
            </a>
          </OutlinedButton>
          <FillButton onClick={handleClick}>Export Type</FillButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <a href={`${URL_FIX_BASE_PATH}/pdfPlantReport`}>PDF Format</a>
            </MenuItem>
            <MenuItem>
              <a href={`${URL_FIX_BASE_PATH}/exportDataPlant`}>Excel Format</a>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="masters-main-content-body">
        {tabRenderValuePlant[tabValue]}
      </div>
      <ReusableConfirmationDialog
        open={isConfirmationDialogOpen}
        title="Plant Status Bulk Change"
        content="Are you sure you want to change the selected record's status?"
        onConfirm={handlePlantBulkStatusChangeAction}
        onCancel={handleOpenConfirmationDialog}
      />
      <ReusableConfirmationDialog
        open={isConfirmationDeleteDialogOpen}
        title="Are your sure you want Delete"
        content="you may lose your record"
        onConfirm={handlePlantDeleteHandler}
        onCancel={handleOpenConfirmationDeleteDialog}
      />
      <ReusableSnackbar
        message="Plant Deleted Sucessfully!"
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
    </section>
  );
}
