"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import UploadButton from "@/components/Button/UploadButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import CustomTabs from "@/components/Tabs/Tabs";
import api, { URL_FIX_BASE_PATH } from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { Menu, MenuItem } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useContext, useEffect, useState } from "react";
import {
  ValidMasterDataTabs,
  mastersPlantSubFields,
  mastersProps,
} from "../../../TypesStore";
import CreateDepartmentMastert from "./(PlantAction)/(Department)/_CreateDepartment";
import EditDepartmentMastert from "./(PlantAction)/(Department)/_EditDepartment";
import CreateStorageBin from "./(PlantAction)/(StorageBin)/_CreateStorageBin";
import EditStorageBin from "./(PlantAction)/(StorageBin)/_EditStorageBin";
import CreateValuationClass from "./(PlantAction)/(ValuationClass)/_CreateValuationClass";
import EditValuationClass from "./(PlantAction)/(ValuationClass)/_EditValuationClass";
import CreateMastert from "./_CreateMaster";
import CreateMastertWithDropdown from "./_CreateWithDropdown";
import EditMaster from "./_EditMaster";
import EditMasterWithDropdown from "./_EditWithDropdown";
import Plantgrid from "./_Plantgrid";
import "./style.scss";

export default function Masters() {
  // const [tabValue, settabValue] = useState("table");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [EditDataGet, setEditDataGet] = useState<any>({});
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    isConfirmationBulkDeleteDialogOpen,
    setConfirmationBulkDeleteDialogOpen,
  ] = useState(false);
  const [CreateDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setConfirmationDeleteDialogOpen] =
    useState(false);
  const HandlerCloseCreateDrawer = () => {
    setCreateDrawerOpen(false);
  };
  const PlantDataCon = useContext(UseContextHook);
  const {
    setPlantData,
    masters,
    SelectedMasterDatatab,
    setSelectedMasterDatatab,
    tabValue,
    settabValue,
    auth,
    editTabShow,
  } = PlantDataCon;
  const router = useRouter();

  useEffect(() => {
    if (setSelectedMasterDatatab) {
      setSelectedMasterDatatab("Plant");
    }
    router.refresh();
  }, [setSelectedMasterDatatab, router]);
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;

  const authHook = UseAuth();
  if (!authHook && !auth) {
    return null;
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
          (masters[ExactPath] as mastersPlantSubFields)[
            SelectedMasterDatatab as ValidMasterDataTabs
          ]?.delete
        }/${selectedId}`
      );
      const dataPlant = await getAllPlantData(`${getAllLinkName}`);
      const data = await res.data;
      if (res.status === 204) {
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
  if (!SelectedMasterDatatab) {
    return null;
  }
  const EditSetRecordAndGotoAction = (data: any) => {
    setEditDataGet(data);
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
    create: (masters[ExactPath] as mastersPlantSubFields)[
      SelectedMasterDatatab as ValidMasterDataTabs
    ]?.includePlantDropdown ? (
      <CreateMastertWithDropdown />
    ) : SelectedMasterDatatab === "Department" ? (
      <CreateDepartmentMastert />
    ) : SelectedMasterDatatab === "StorageBin" ? (
      <CreateStorageBin />
    ) : SelectedMasterDatatab === "ValuationClass" ? (
      <CreateValuationClass />
    ) : (
      <CreateMastert />
    ),
    edit: (masters[ExactPath] as mastersPlantSubFields)[
      SelectedMasterDatatab as ValidMasterDataTabs
    ]?.includePlantDropdown ? (
      <EditMasterWithDropdown EditDataGet={EditDataGet} />
    ) : SelectedMasterDatatab === "Department" ? (
      <EditDepartmentMastert EditDataGet={EditDataGet} />
    ) : SelectedMasterDatatab === "StorageBin" ? (
      <EditStorageBin EditDataGet={EditDataGet} />
    ) : SelectedMasterDatatab === "ValuationClass" ? (
      <EditValuationClass EditDataGet={EditDataGet} />
    ) : (
      <EditMaster EditDataGet={EditDataGet} />
    ),
  };
  const getAllLinkName = (masters[ExactPath] as mastersPlantSubFields)[
    SelectedMasterDatatab as ValidMasterDataTabs
  ]?.getAll;

  const handlePlantBulkStatusChangeAction = async () => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as mastersPlantSubFields)[
            SelectedMasterDatatab as ValidMasterDataTabs
          ].updateBulkStatus
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
          (masters[ExactPath] as mastersPlantSubFields)[
            SelectedMasterDatatab as ValidMasterDataTabs
          ].deleteBulk
        }`,
        { data: selectionIDArr }
      );
      const dataPlant = await getAllPlantData(`${getAllLinkName}`);

      if (res.status === 204) {
        setConfirmationBulkDeleteDialogOpen(false);
        setOpenSnackbar(true);
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
    (masters[ExactPath] as mastersPlantSubFields)[
      SelectedMasterDatatab as ValidMasterDataTabs
    ]?.template
  }`;
  const templateDownloadName = `${SelectedMasterDatatab}_template.xlsx`;
  const excelDownloadUrl = `${URL_FIX_BASE_PATH}${
    (masters[ExactPath] as mastersPlantSubFields)[
      SelectedMasterDatatab as ValidMasterDataTabs
    ]?.exportExcel
  }`;
  const excelDownloadName = `${SelectedMasterDatatab} record.xlsx`;
  const pdfDownloadUrl = `${URL_FIX_BASE_PATH}${
    (masters[ExactPath] as mastersPlantSubFields)[
      SelectedMasterDatatab as ValidMasterDataTabs
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
      <ReusableSnackbar
        message={`${SelectedMasterDatatab} Deleted Sucessfully!`}
        severity="success"
        setOpen={setOpenSnackbar}
        open={openSnackbar}
      />
      <CreateDreawer
        OpenDrawer={CreateDrawerOpen}
        HandlerCloseDrawer={HandlerCloseCreateDrawer}
      />
    </section>
  );
}
