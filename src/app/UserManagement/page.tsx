"use client";
import { UseContextHook } from "@/Provides/UseContextHook";
import CustomTabs from "@/components/Tabs/Tabs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { GridRowId } from "@mui/x-data-grid";
import { ReactNode, useContext, useState } from "react";
import CreateUser from "./_CreateUser";
import EditUser from "./_EditUser";
import UserGrid from "./_UserGrid";
import "./style.scss";
export default function UserManagement() {
  const mastersData = useContext(UseContextHook);
  const [tabValue, settabValue] = useState("table");
  const [selectionIDArr, setSelectionIDArr] = useState<GridRowId[]>([]);
  const [editTabShow, seteditTabShow] = useState(false);
  const { auth } = mastersData;
  const tabs = [
    { label: `User View`, value: "table" },
    { label: `Create User`, value: "create" },

    {
      label: tabValue === "edit" ? `Edit User` : "",
      value: "edit",
      disabled: editTabShow,
    },
  ];
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "table" | "edit" | "create"
  ) => {
    settabValue(newValue);
  };
  const tabRenderedData: Record<string, ReactNode> = {
    table: <UserGrid />,
    create: <CreateUser />,
    edit: <EditUser />,
  };
  const handleOpenStatusBulkConfirmationDialog = async () => {};
  const handleOpenDeleteConfirmationDialog = async () => {};
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
    </div>
  );
}
