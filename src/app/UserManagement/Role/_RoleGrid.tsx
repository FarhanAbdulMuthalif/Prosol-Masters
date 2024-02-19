import useFetch from "@/Hooks/useFetch";
import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import api from "@/components/api";
import { RoleTableColumns } from "@/utils/TableSources";
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
import { RoleInitialStateProps } from "../../../../TypesStore";

export default function RoleGrid({
  setSelectionIDArr,
  RoleData,
  setRoleData,
  EditSetRecordAndGotoAction,
}: {
  RoleData: RoleInitialStateProps[];
  setSelectionIDArr: Dispatch<SetStateAction<GridRowId[]>>;
  setRoleData: Dispatch<SetStateAction<RoleInitialStateProps[]>>;
  EditSetRecordAndGotoAction: (val: RoleInitialStateProps) => void;
}) {
  const ROleDataCon = useContext(UseContextHook);
  const { setReusableSnackBar, ThemeColor } = ROleDataCon;
  const [SlectedId, setSlectedId] = useState(0);
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: PlantData } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Roles = await api.get(`/user/getAllRoles?show=false`);
        setRoleData(Roles.data);
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
  }, [setRoleData, setReusableSnackBar]);
  const SingleRoleStatusHandler = async (id: number) => {
    try {
      const res = await api.patch(`/user/updateRoleStatusById/${id}`);
      const data = await res.data;
      const Roles = await api.get(`/user/getAllRoles?show=false`);
      setRoleData(Roles.data);
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
  if (!setReusableSnackBar) {
    return null;
  }
  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleUserDeleteConformationDialog = (id: number) => {
    setSlectedId(id);
    setDeleteDialogOpen(true);
  };
  const handleUserDeleteHandler = async () => {
    try {
      const res = await api.delete(`/user/deleteRole/${SlectedId}`);
      const data = await res.data;
      const Roles = await api.get(`/user/getAllRoles?show=false`);
      if (res.status === 204) {
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Role Deleted Sucessfully!`,
          open: true,
        }));
        setDeleteDialogOpen(false);
        setRoleData(Roles.data);
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
      field: `privileges`,
      headerName: "Privileges",
      flex: 2,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return params.row?.privileges.map((data: any) => data.name).join(", ");
      },
    },
    {
      field: `plantId`,
      headerName: "PlantName",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        // if (!PlantData) {
        //   return null;
        // }
        return PlantData
          ? (PlantData as any[]).find((data) => data.id === params.row.plantId)
              ?.plantName
          : [];
      },
    },
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
                SingleRoleStatusHandler(params.row.id);
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
        rows={RoleData || []}
        columns={
          RoleTableColumns.length > 0
            ? RoleTableColumns.concat(actionColumn)
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
