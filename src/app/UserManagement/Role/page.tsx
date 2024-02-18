"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
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
  const ROleDataCon = useContext(UseContextHook);
  const { setReusableSnackBar } = ROleDataCon;
  const [tabValue, settabValue] = useState("table");
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [RoleData, setRoleData] = useState<RoleInitialStateProps[]>([]);
  const [bulkStatusDialog, setbulkStatusDialog] = useState(false);
  const [bulkDeleteDialog, setbulkDeleteDialog] = useState(false);

  const [EditDataGet, setEditDataGet] =
    useState<RoleInitialStateProps>(RoleInitialState);

  if (!setReusableSnackBar) {
    return null;
  }
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
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Role Deleted Sucessfully!`,
          open: true,
        }));
        setRoleData(Users.data);
        setbulkDeleteDialog(false);
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
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Role updated Sucessfully!`,
          open: true,
        }));
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
    </div>
  );
}
