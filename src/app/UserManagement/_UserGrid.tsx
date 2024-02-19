import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import api from "@/components/api";
import { UserTableColumns } from "@/utils/TableSources";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const UserDataCon = useContext(UseContextHook);
  const { setReusableSnackBar, ThemeColor } = UserDataCon;
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Users = await api.get(`/user/getAllUsers`);
        setUserData(Users.data);
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
    fetchData();
  }, [setUserData, setReusableSnackBar]);
  if (!setReusableSnackBar) {
    return null;
  }
  const SingleUserStatusHandler = async (id: number) => {
    try {
      const res = await api.patch(`/user/updateStatusById/${id}`);
      const data = await res.data;
      const Users = await api.get(`/user/getAllUsers`);
      setUserData(Users.data);
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
  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleUserDeleteConformationDialog = (id: number) => {
    setSlectedId(id);
    setDeleteDialogOpen(true);
  };
  const handleUserDeleteHandler = async () => {
    try {
      const res = await api.delete(`/user/deleteUser/${SlectedId}`);
      const data = await res.data;
      const Users = await api.get(`/user/getAllUsers`);
      if (res.status === 204) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `User Deleted Sucessfully!`,
          open: true,
        }));
        setDeleteDialogOpen(false);
        setUserData(Users.data);
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
  const actionColumn: GridColDef[] = [
    {
      field: `status`,
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <ReusableSwitch
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
              sx={{
                fontSize: "1rem",
                color: ThemeColor.primaryColor,
                cursor: "pointer",
              }}
            />

            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
                handleUserDeleteConformationDialog(params.row.id);
              }}
              sx={{
                fontSize: "1rem",
                color: ThemeColor.primaryColor,
                cursor: "pointer",
              }}
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
        columns={
          UserTableColumns.length > 0
            ? UserTableColumns.concat(actionColumn)
            : []
        }
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
    </div>
  );
}
