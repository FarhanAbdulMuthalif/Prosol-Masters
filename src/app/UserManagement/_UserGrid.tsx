import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import api from "@/components/api";
import { UserTableColumns } from "@/utils/TableSources";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserInitialStateProps } from "../../../TypesStore";

export default function UserGrid({
  setSelectionIDArr,
  UserData,
  setUserData,
  EditSetRecordAndGotoAction,
}: {
  UserData: UserInitialStateProps[];
  setSelectionIDArr: Dispatch<SetStateAction<GridRowId[]>>;
  setUserData: Dispatch<SetStateAction<UserInitialStateProps[]>>;
  EditSetRecordAndGotoAction: (val: UserInitialStateProps) => void;
}) {
  const [SlectedId, setSlectedId] = useState(0);
  const [OpenDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const Users = await api.get(`/user/getAllUsers`);
      setUserData(Users.data);
    };
    fetchData();
  }, [setUserData]);
  const SingleUserStatusHandler = async (id: number) => {
    const res = await api.patch(`/user/updateStatusById/${id}`);
    const data = await res.data;
    const Users = await api.get(`/user/getAllUsers`);
    setUserData(Users.data);
  };
  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleUserDeleteConformationDialog = (id: number) => {
    setSlectedId(id);
    setDeleteDialogOpen(true);
  };
  const handleUserDeleteHandler = async () => {
    const res = await api.delete(`/user/deleteUser/${SlectedId}`);
    const data = await res.data;
    const Users = await api.get(`/user/getAllUsers`);
    if (res.status === 204) {
      setOpenDeleteSnackBar(true);
      setDeleteDialogOpen(false);
      setUserData(Users.data);
    }
  };
  const actionColumn: GridColDef[] = [
    {
      field: `status`,
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <Switch
              color="primary"
              size="small"
              checked={params.row.status}
              onChange={(e) => {
                SingleUserStatusHandler(params.row.id);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <EditOutlinedIcon
              onClick={() => {
                console.log(params.row);
                EditSetRecordAndGotoAction(params.row);
              }}
              sx={{ fontSize: "1rem", color: "black", cursor: "pointer" }}
            />

            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
                handleUserDeleteConformationDialog(params.row.id);
              }}
              sx={{ fontSize: "1rem", color: "black", cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <CustomDataGrid
        rows={UserData || []}
        columns={UserTableColumns.concat(actionColumn)}
        onRowSelectionModelChange={(item) => {
          setSelectionIDArr(item);
        }}
      />
      <ReusableConfirmationDialog
        open={DeleteDialogOpen}
        title="Are your sure you want Delete"
        content="you may lose your record"
        onConfirm={handleUserDeleteHandler}
        onCancel={handleDeleteCloseDialog}
      />
      <ReusableSnackbar
        message={`User Deleted Sucessfully!`}
        severity="success"
        setOpen={setOpenDeleteSnackBar}
        open={OpenDeleteSnackBar}
      />
    </div>
  );
}
