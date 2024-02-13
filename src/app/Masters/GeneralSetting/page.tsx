"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import CustomTabs from "@/components/Tabs/Tabs";
import api, { URL_FIX_BASE_PATH } from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode, useContext, useState } from "react";
import {
  ValidMasterGeneralSettingabs,
  masterGeneralSettingsSubFields,
  mastersProps,
} from "../../../../TypesStore";

import OutlinedButton from "@/components/Button/OutlineButton";
import UploadButton from "@/components/Button/UploadButton";
import { Menu, MenuItem } from "@mui/material";

import CreateAttributeUOM from "./(GeneralSettingAction)/(AttributeUOM)/_CreateAttributeUOm";
import EditAttributeUOM from "./(GeneralSettingAction)/(AttributeUOM)/_EditAttributeUOm";
import CreateHSN from "./(GeneralSettingAction)/(HSN)/_CreateHSN";
import EditHSN from "./(GeneralSettingAction)/(HSN)/_EditHSN";
import CreateNMUOM from "./(GeneralSettingAction)/(NMUOM)/_CreateNMUOM";
import EditNMUOM from "./(GeneralSettingAction)/(NMUOM)/_EditNMUOM";
import CreateSubGroupCode from "./(GeneralSettingAction)/(SubGroupCode/_CreateSubGroupCode";
import EditSubGroupCode from "./(GeneralSettingAction)/(SubGroupCode/_EditSubGroupCode";
import CreateSubSubGroupCode from "./(GeneralSettingAction)/(SubSubGroupCode)/_CreateSubSubGroupCode";
import EditSubSubGroupCode from "./(GeneralSettingAction)/(SubSubGroupCode)/_EditSubSubGroupCode";
import CreateGeneralSetting from "./(GeneralSettingAction)/_CreateGeneralSetting";
import EditGeneralSetting from "./(GeneralSettingAction)/_EditGeneralSetting";
import GeneralSettingGrid from "./(GeneralSettingAction)/_GeneralSettingGrid";
import "./style.scss";

export default function GeneralSetting() {
  const [EditDataGet, setEditDataGet] = useState<any>({});
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    isConfirmationBulkDeleteDialogOpen,
    setConfirmationBulkDeleteDialogOpen,
  ] = useState(false);
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setConfirmationDeleteDialogOpen] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

    tabValue,
    settabValue,
    editTabShow,
    auth,
    setReusableSnackBar,
  } = PlantDataCon;

  const authHook = UseAuth();
  if (!authHook && !auth) {
    return null;
  }

  if (!tabValue || !settabValue || !setReusableSnackBar) {
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
    {
      label: `Create ${SelectedMasterDatatab}`,
      value: "create",
    },

    {
      label: tabValue === "edit" ? `Edit ${SelectedMasterDatatab}` : "",
      value: "edit",
      disabled: editTabShow,
    },
  ];

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
          (masters[ExactPath] as masterGeneralSettingsSubFields)[
            SelectedMasterDatatab as ValidMasterGeneralSettingabs
          ]?.delete
        }/${selectedId}`
      );
      const dataPlant = await getAllPlantData(`${getAllLinkName}`);
      const data = await res.data;
      if (res.status === 204) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `${SelectedMasterDatatab} Deleted Sucessfully!`,
          open: true,
        }));
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
  if (!SelectedMasterDatatab) {
    return null;
  }
  const EditSetRecordAndGotoAction = (data: any) => {
    setEditDataGet(data);
    settabValue("edit");
  };
  const tabRenderValuePlant: Record<string, ReactNode> = {
    table: (
      <GeneralSettingGrid
        selectionIDArr={setSelectionIDArr}
        handleOpenConfirmationDeleteDialog={GetIdandOpenHandler}
        EditSetRecordAndGotoAction={EditSetRecordAndGotoAction}
      />
    ),
    create:
      SelectedMasterDatatab === "SubGroupCodes" ? (
        <CreateSubGroupCode />
      ) : SelectedMasterDatatab === "SubSubGroupCodes" ? (
        <CreateSubSubGroupCode />
      ) : SelectedMasterDatatab === "NMUOM" ? (
        <CreateNMUOM />
      ) : SelectedMasterDatatab === "AttributeUOM" ? (
        <CreateAttributeUOM />
      ) : SelectedMasterDatatab === "HSN" ? (
        <CreateHSN />
      ) : (
        <CreateGeneralSetting />
      ),
    edit:
      SelectedMasterDatatab === "SubGroupCodes" ? (
        <EditSubGroupCode EditDataGet={EditDataGet} />
      ) : SelectedMasterDatatab === "SubSubGroupCodes" ? (
        <EditSubSubGroupCode EditDataGet={EditDataGet} />
      ) : SelectedMasterDatatab === "NMUOM" ? (
        <EditNMUOM EditDataGet={EditDataGet} />
      ) : SelectedMasterDatatab === "AttributeUOM" ? (
        <EditAttributeUOM EditDataGet={EditDataGet} />
      ) : SelectedMasterDatatab === "HSN" ? (
        <EditHSN EditDataGet={EditDataGet} />
      ) : (
        <EditGeneralSetting EditDataGet={EditDataGet} />
      ),
  };
  const getAllLinkName = (
    masters[ExactPath] as masterGeneralSettingsSubFields
  )?.[SelectedMasterDatatab as ValidMasterGeneralSettingabs]?.getAll;

  const handlePlantBulkStatusChangeAction = async () => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as masterGeneralSettingsSubFields)[
            SelectedMasterDatatab as ValidMasterGeneralSettingabs
          ]?.updateBulkStatus
        }`,
        selectionIDArr
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
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  const handlePlantBulkDeleteChangeAction = async () => {
    try {
      const res = await api.delete(
        `${
          (masters[ExactPath] as masterGeneralSettingsSubFields)[
            SelectedMasterDatatab as ValidMasterGeneralSettingabs
          ]?.deleteBulk
        }`,
        { data: selectionIDArr }
      );
      const dataPlant = await getAllPlantData(`${getAllLinkName}`);

      if (res.status === 204) {
        setConfirmationBulkDeleteDialogOpen(false);
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `${SelectedMasterDatatab} Deleted Sucessfully!`,
          open: true,
        }));
        if (setPlantData) {
          setPlantData(dataPlant);
          setConfirmationDeleteDialogOpen(false);
        }
      }
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  const templateDownloadUrl = `${URL_FIX_BASE_PATH}${
    (masters[ExactPath] as masterGeneralSettingsSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralSettingabs
    ]?.template
  }`;
  const templateDownloadName = `${SelectedMasterDatatab}_template.xlsx`;
  const excelDownloadUrl = `${URL_FIX_BASE_PATH}${
    (masters[ExactPath] as masterGeneralSettingsSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralSettingabs
    ]?.exportExcel
  }`;
  const excelDownloadName = `${SelectedMasterDatatab} record.xlsx`;
  const pdfDownloadUrl = `${URL_FIX_BASE_PATH}${
    (masters[ExactPath] as masterGeneralSettingsSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralSettingabs
    ]?.exportPdf
  }`;
  const pdfDownloadName = `${SelectedMasterDatatab} record.pdf`;
  const handleDownload = async (DownloadUrl: string, DownloadName: string) => {
    try {
      const response = await api.get(DownloadUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${DownloadName}`);
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      } else {
        console.log("Failed to remove link from the document body.");
      }
    } catch (err) {
      console.log(err);
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
          <OutlinedButton
            startIcon={<FileDownloadIcon />}
            onClick={() => {
              handleDownload(templateDownloadUrl, templateDownloadName);
            }}
          >
            Download Template
          </OutlinedButton>
          <FillButton onClick={handleClick}>Export Type</FillButton>
          <FillButton
            onClick={() => {
              setCreateDrawerOpen(true);
            }}
          >
            Add Fields
          </FillButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleDownload(pdfDownloadUrl, pdfDownloadName);
              }}
            >
              PDF Format
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDownload(excelDownloadUrl, excelDownloadName);
              }}
            >
              Excel Format
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="masters-main-content-body">
        {tabRenderValuePlant[tabValue]}
      </div>
      <ReusableConfirmationDialog
        open={isConfirmationDialogOpen}
        title={`${SelectedMasterDatatab} Status Bulk Change`}
        content="Are you sure you want to change the selected record's status?"
        onConfirm={handlePlantBulkStatusChangeAction}
        onCancel={handleOpenConfirmationDialog}
      />
      <ReusableConfirmationDialog
        open={isConfirmationBulkDeleteDialogOpen}
        title={`${SelectedMasterDatatab} Delete Bulk `}
        content="Are you sure you want to delete the selected record's Details?"
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

      <CreateDreawer
        OpenDrawer={CreateDrawerOpen}
        HandlerCloseDrawer={HandlerCloseCreateDrawer}
      />
    </section>
  );
}
