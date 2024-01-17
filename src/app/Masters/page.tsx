"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import UploadButton from "@/components/Button/UploadButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import CustomTabs from "@/components/Tabs/Tabs";
import api, { URL_FIX_BASE_PATH } from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Menu, MenuItem } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useContext, useState } from "react";
import { ValidMasterDataTabs } from "../../../TypesStore";
import CreatePlant from "./_CreatePlant";
import EditPlant from "./_EditPlant";
import Plantgrid from "./_Plantgrid";
import "./style.scss";

export default function Masters() {
  // const [tabValue, settabValue] = useState("table");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [EditTabVisible, setEditTabVisible] = useState(false);
  const [EditDataGet, setEditDataGet] = useState({
    plantName: "",
    plantCode: "",
    id: 0,
    status: false,
    createdBy: "",
    createdAt: "",
    updatedAt: "",
    updatedBy: "",
  });
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    isConfirmationBulkDeleteDialogOpen,
    setConfirmationBulkDeleteDialogOpen,
  ] = useState(false);
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setConfirmationDeleteDialogOpen] =
    useState(false);
  const PlantDataCon = useContext(UseContextHook);
  const {
    setPlantData,
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    tabValue,
    settabValue,
    auth,
  } = PlantDataCon;
  const router = useRouter();

  if (!auth) {
    return router.push("/Login");
  }
  if (!tabValue || !settabValue) {
    return null;
  }
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "table" | "edit" | "create"
  ) => {
    settabValue(newValue);
  };
  const tabs = [
    { label: `${SelectedMasterDatatab} View`, value: "table" },
    { label: `Create ${SelectedMasterDatatab}`, value: "create" },
    { label: `Edit ${SelectedMasterDatatab}`, value: "edit" },
  ];

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialogOpen(!isConfirmationDialogOpen);
  };
  const handleOpenDeleteConfirmationDialog = () => {
    setConfirmationBulkDeleteDialogOpen(!isConfirmationBulkDeleteDialogOpen);
  };

  const handleOpenConfirmationDeleteDialog = () => {
    setConfirmationDeleteDialogOpen(false);
  };
  const GetIdandOpenHandler = (val: number) => {
    setConfirmationDeleteDialogOpen(true);
    setselectedId(val);
  };
  const handlePlantDeleteHandler = async () => {
    try {
      const res = await api.delete(
        `${
          masters[SelectedMasterDatatab as ValidMasterDataTabs].delete
        }/${selectedId}`
      );
      const dataPlant = await getAllPlantData(`${getAllLinkName}`);
      const data = await res.data;
      if (res.status === 200) {
        setOpenSnackbar(true);
        setConfirmationDeleteDialogOpen(false);
        if (setPlantData) {
          setPlantData(dataPlant);
        }
      }
    } catch (e) {
      console.log(e);
      // console.log(e.ma)
    }
  };
  const EditSetRecordAndGotoAction = (data: any) => {
    setEditDataGet((prev) => {
      return {
        plantName: data.plantName,
        plantCode: data.plantCode,
        id: data.id,
        status: data.status,
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
      };
    });
    settabValue("edit");
  };
  const tabRenderValuePlant: Record<string, ReactNode> = {
    table: (
      <Plantgrid
        selectionIDArr={setSelectionIDArr}
        handleOpenConfirmationDeleteDialog={GetIdandOpenHandler}
        EditSetRecordAndGotoAction={EditSetRecordAndGotoAction}
      />
    ),
    create: <CreatePlant />,
    edit: (
      <EditPlant
        plantName={EditDataGet.plantName}
        plantCode={EditDataGet.plantCode}
        id={EditDataGet.id}
        status={EditDataGet.status}
        createdAt={EditDataGet.createdAt}
        updatedAt={EditDataGet.updatedAt}
        updatedBy={EditDataGet.updatedBy}
        createdBy={EditDataGet.createdBy}
      />
    ),
  };
  const getAllLinkName =
    masters[SelectedMasterDatatab as ValidMasterDataTabs].getAll;

  const handlePlantBulkStatusChangeAction = async () => {
    const res = await api.patch(
      `${
        masters[SelectedMasterDatatab as ValidMasterDataTabs].updateBulkStatus
      }/${selectionIDArr.toString()}`
    );
    const dataPlantUpdate = await res.data;
    const dataPlant = await getAllPlantData(`${getAllLinkName}`);
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
  const handlePlantBulkDeleteChangeAction = async () => {
    const res = await api.delete(
      `${masters[SelectedMasterDatatab as ValidMasterDataTabs].deleteBulk}`,
      { data: selectionIDArr }
    );
    const dataPlantUpdate = await res.data;
    const dataPlant = await getAllPlantData(`${getAllLinkName}`);
    console.log(dataPlant);
    console.log(dataPlantUpdate);
    if (res.status === 200) {
      setConfirmationBulkDeleteDialogOpen(false);
      setOpenSnackbar(true);
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
            <DeleteOutlineIcon
              sx={{ color: "#1976D2" }}
              onClick={handleOpenDeleteConfirmationDialog}
            />
          ) : (
            ""
          )}
          {selectionIDArr.length > 0 ? (
            <PublishedWithChangesIcon
              sx={{ color: "#1976D2" }}
              onClick={handleOpenConfirmationDialog}
            />
          ) : (
            ""
          )}
          <UploadButton />
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
        open={isConfirmationBulkDeleteDialogOpen}
        title="Plant Status Bulk Change"
        content="Are you sure you want to change the selected record's status?"
        onConfirm={handlePlantBulkDeleteChangeAction}
        onCancel={handleOpenDeleteConfirmationDialog}
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
