"use client";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import CustomTabs from "@/components/Tabs/Tabs";
import api, { URL_FIX_BASE_PATH } from "@/components/api";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Menu, MenuItem } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { MouseEvent, ReactNode, useState } from "react";
import CreatePlant from "./_CreatePlant";
import Plantgrid from "./_Plantgrid";
import "./style.scss";

export default function Masters() {
  const [tabValue, settabValue] = useState("table");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    settabValue(newValue);
  };
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
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(!isConfirmationDialogOpen);
  };
  const tabRenderValuePlant: Record<string, ReactNode> = {
    table: <Plantgrid selectionIDArr={setSelectionIDArr} />,
    create: <CreatePlant />,
  };
  const handlePlantBulkStatusChangeAction = async () => {
    const res = await api.patch(
      `updateBulkStatusPlantId/${selectionIDArr.toString()}`
    );
    const data = await res.data;
    if (res.status === 200) {
      setConfirmationDialogOpen(false);
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
    </section>
  );
}
