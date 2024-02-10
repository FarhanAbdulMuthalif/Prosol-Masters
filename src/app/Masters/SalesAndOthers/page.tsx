"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import CreateDreawer from "@/components/DynamicFields/Drawer/CreateDreawer";
import CustomTabs from "@/components/Tabs/Tabs";
import api from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
  ValidMastersSalesAndOthersTabs,
  mastersProps,
  mastersSalesAndOthersSubFields,
} from "../../../../TypesStore";

import CreateSalesOrganization from "./(SalesAndOthersAction)/(SalesOrganiztion))/_CreateSalesOrganization";
import EditSalesOrganization from "./(SalesAndOthersAction)/(SalesOrganiztion))/_EditSalesOrganization";
import CreateSalesAndOthers from "./(SalesAndOthersAction)/_CreateSalesAndOthers";
import CreateSalesAndOtherswithPlant from "./(SalesAndOthersAction)/_CreateSalesAndOtherswithPlant";
import EditSalesAndOthers from "./(SalesAndOthersAction)/_EditSalesAndOthers";
import EditSalesAndOthersWithPlant from "./(SalesAndOthersAction)/_EditSalesAndOthersWithPlant";
import SalesAndOthersGrid from "./(SalesAndOthersAction)/_SalesAndOthersGrid";
import "./style.scss";

export default function SalesAndOthers() {
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
    auth,
    setReusableSnackBar,
  } = PlantDataCon;
  useEffect(() => {
    if (setSelectedMasterDatatab) {
      setSelectedMasterDatatab("AccAssignment");
    }
  }, [setSelectedMasterDatatab]);
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
          (masters[ExactPath] as mastersSalesAndOthersSubFields)[
            SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
          ].delete
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
      <SalesAndOthersGrid
        selectionIDArr={setSelectionIDArr}
        handleOpenConfirmationDeleteDialog={GetIdandOpenHandler}
        EditSetRecordAndGotoAction={EditSetRecordAndGotoAction}
      />
    ),
    create: (masters[ExactPath] as mastersSalesAndOthersSubFields)[
      SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
    ]?.includePlantDropdown ? (
      <CreateSalesAndOtherswithPlant />
    ) : SelectedMasterDatatab === "DistributionChannel" ? (
      <CreateSalesOrganization />
    ) : (
      <CreateSalesAndOthers />
    ),
    edit: (masters[ExactPath] as mastersSalesAndOthersSubFields)[
      SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
    ]?.includePlantDropdown ? (
      <EditSalesAndOthersWithPlant EditDataGet={EditDataGet} />
    ) : SelectedMasterDatatab === "DistributionChannel" ? (
      <EditSalesOrganization EditDataGet={EditDataGet} />
    ) : (
      <EditSalesAndOthers EditDataGet={EditDataGet} />
    ),
  };
  const getAllLinkName = (masters[ExactPath] as mastersSalesAndOthersSubFields)[
    SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
  ]?.getAll;

  const handlePlantBulkStatusChangeAction = async () => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as mastersSalesAndOthersSubFields)[
            SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
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
          (masters[ExactPath] as mastersSalesAndOthersSubFields)[
            SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
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
          <FillButton
            onClick={() => {
              setCreateDrawerOpen(true);
            }}
          >
            Add Fields
          </FillButton>
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
