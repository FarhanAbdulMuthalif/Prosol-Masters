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
  const { setReusableSnackBar } = UserDataCon;
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Users = await api.get(`/user/getAllUsers`);
        setUserData(Users.data);
      } catch (e: any) {
        console.log(e?.response);
      }
    };
    fetchData();
  }, [setUserData]);
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
    </div>
  );
}
