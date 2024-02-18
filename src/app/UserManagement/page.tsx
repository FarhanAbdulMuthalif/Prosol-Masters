"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import CustomTabs from "@/components/Tabs/Tabs";
import api from "@/components/api";
import { UserInitialState } from "@/utils/UserDataExport";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { GridRowId } from "@mui/x-data-grid";
import { ReactNode, useContext, useState } from "react";
import { UserInitialStateProps } from "../../../TypesStore";
import CreateUser from "./_CreateUser";
import EditUser from "./_EditUser";
import UserGrid from "./_UserGrid";
import "./style.scss";
export default function UserManagement() {
  const UserDataCon = useContext(UseContextHook);
  const { setReusableSnackBar } = UserDataCon;
  const [tabValue, settabValue] = useState("table");
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [UserData, setUserData] = useState<UserInitialStateProps[]>([]);
  const [bulkStatusDialog, setbulkStatusDialog] = useState(false);
  const [bulkDeleteDialog, setbulkDeleteDialog] = useState(false);

  const [EditDataGet, setEditDataGet] =
    useState<UserInitialStateProps>(UserInitialState);
  const auth = UseAuth();
  if (!auth || !setReusableSnackBar) {
    return null;
  }
  const tabs = [
    { label: `User View`, value: "table" },
    { label: `Create User`, value: "create" },

    {
      label: tabValue === "edit" ? `Edit User` : "",
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
  const EditSetRecordAndGotoAction = (data: UserInitialStateProps) => {
    setEditDataGet(data);
    settabValue("edit");
  };
  const tabRenderedData: Record<string, ReactNode> = {
    table: (
      <UserGrid
        setSelectionIDArr={setSelectionIDArr}
        setUserData={setUserData}
        UserData={UserData}
        EditSetRecordAndGotoAction={EditSetRecordAndGotoAction}
      />
    ),
    create: <CreateUser />,
    edit: <EditUser settabValue={settabValue} EditDataGet={EditDataGet} />,
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
      const res = await api.delete("/user/deleteBatchUser", {
        data: selectionIDArr,
      });
      const Users = await api.get(`/user/getAllUsers`);
      if (res.status === 200) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User updated Sucessfully!`,
          open: true,
        }));
        setUserData(Users.data);
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
        "/user/updateBulkStatusUsingId",
        selectionIDArr
      );
      const Users = await api.get(`/user/getAllUsers`);
      if (res.status === 200) {
        setUserData(Users.data);
        setbulkStatusDialog(false);
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User s updated Sucessfully!`,
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
