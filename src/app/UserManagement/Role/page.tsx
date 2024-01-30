"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import CustomTabs from "@/components/Tabs/Tabs";
import api from "@/components/api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { GridRowId } from "@mui/x-data-grid";
import { ReactNode, useContext, useState } from "react";

import { RoleInitialState } from "@/utils/UserDataExport";
import { RoleInitialStateProps } from "../../../../TypesStore";
import CreateRole from "./_CreateRole";
import EditRole from "./_EditRole";
import RoleGrid from "./_RoleGrid";
import "./style.scss";
export default function Role() {
  const mastersData = useContext(UseContextHook);
  const [tabValue, settabValue] = useState("table");
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [RoleData, setRoleData] = useState<RoleInitialStateProps[]>([]);
  const [bulkStatusDialog, setbulkStatusDialog] = useState(false);
  const [bulkDeleteDialog, setbulkDeleteDialog] = useState(false);
  const [blkdltSucess, setblkdltSucess] = useState(false);
  const [blkstatusSucess, setblkstatusSucess] = useState(false);
  const [EditDataGet, setEditDataGet] =
    useState<RoleInitialStateProps>(RoleInitialState);

  const tabs = [
    { label: `Role View`, value: "table" },
    { label: `Create Role`, value: "create" },

    {
      label: tabValue === "edit" ? `Edit Role` : "",
      value: "edit",
      disabled: true,
    },
  ];
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "table" | "edit" | "create"
  ) => {
    settabValue(newValue);
  };
  const EditSetRecordAndGotoAction = (data: RoleInitialStateProps) => {
    setEditDataGet(data);
    settabValue("edit");
  };
  const tabRenderedData: Record<string, ReactNode> = {
    table: (
      <RoleGrid
        setSelectionIDArr={setSelectionIDArr}
        setRoleData={setRoleData}
        RoleData={RoleData}
        EditSetRecordAndGotoAction={EditSetRecordAndGotoAction}
      />
    ),
    create: <CreateRole />,
    edit: <EditRole settabValue={settabValue} EditDataGet={EditDataGet} />,
  };
  const handleOpenBulkStatusDialog = () => {
    setbulkStatusDialog(!bulkStatusDialog);
  };
  const handleOpenBulkDeleteDialog = () => {
    setbulkDeleteDialog(!bulkDeleteDialog);
  };
  const handleOpenStatusBulkConfirmationDialog = () => {
    setbulkStatusDialog(true);
  };
  const bulkDeleteConformation = async () => {
    try {
      const res = await api.delete("/user/deleteBatchRole", {
        data: selectionIDArr,
      });
      const Users = await api.get(`/user/getAllRoles?show=false`);
      if (res.status === 200) {
        setblkdltSucess(true);
        setRoleData(Users.data);
        setbulkDeleteDialog(false);
      }
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  const bulkStatusConformation = async () => {
    try {
      const res = await api.patch(
        "/user/updateBulkStatusRoleId",
        selectionIDArr
      );
      const Roles = await api.get(`/user/getAllRoles?show=false`);
      if (res.status === 200) {
        setRoleData(Roles.data);
        setbulkStatusDialog(false);
        setblkstatusSucess(true);
      }
    } catch (e: any) {
      console.log(e?.response);
    }
  };
  const handleOpenDeleteConfirmationDialog = () => {
    setbulkDeleteDialog(true);
  };

  return (
    <div className="usermanagement-wrapper">
      <div className="usermanagement-main-content-header">
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></CustomTabs>
        <div className="usermanagement-main-content-header-side">
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
              onClick={handleOpenStatusBulkConfirmationDialog}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {tabRenderedData[tabValue]}
      <ReusableConfirmationDialog
        open={bulkDeleteDialog}
        title="Are your sure you want Delete the Selected Records"
        content="you may lose your record"
        onConfirm={bulkDeleteConformation}
        onCancel={handleOpenBulkDeleteDialog}
      />
      <ReusableConfirmationDialog
        open={bulkStatusDialog}
        title="Are your sure you want Change Status of the Selected Records"
        content="you may not log the account on inactive"
        onConfirm={bulkStatusConformation}
        onCancel={handleOpenBulkStatusDialog}
      />
      <ReusableSnackbar
        message={`Role Status Changed Sucessfully!`}
        severity="success"
        setOpen={setblkstatusSucess}
        open={blkstatusSucess}
      />
      <ReusableSnackbar
        message={`Role Deleted Sucessfully!`}
        severity="success"
        setOpen={setblkdltSucess}
        open={blkdltSucess}
      />
    </div>
  );
}
