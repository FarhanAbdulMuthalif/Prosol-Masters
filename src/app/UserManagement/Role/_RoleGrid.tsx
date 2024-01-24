import useFetch from "@/Hooks/useFetch";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import ReusableSnackbar from "@/components/Snackbar/Snackbar";
import api from "@/components/api";
import { RoleTableColumns } from "@/utils/TableSources";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [SlectedId, setSlectedId] = useState(0);
  const [OpenDeleteSnackBar, setOpenDeleteSnackBar] = useState(false);
  const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: PlantData } = useFetch("/plant/getAllPlant") ?? {
    data: [],
  };
  useEffect(() => {
    const fetchData = async () => {
      const Roles = await api.get(`/user/getAllRoles?show=false`);
      setRoleData(Roles.data);
    };
    fetchData();
  }, [setRoleData]);
  const SingleRoleStatusHandler = async (id: number) => {
    const res = await api.patch(`/user/updateRoleStatusById/${id}`);
    const data = await res.data;
    const Roles = await api.get(`/user/getAllRoles?show=false`);
    setRoleData(Roles.data);
  };
  const handleDeleteCloseDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleUserDeleteConformationDialog = (id: number) => {
    setSlectedId(id);
    setDeleteDialogOpen(true);
  };
  const handleUserDeleteHandler = async () => {
    const res = await api.delete(`/user/deleteRole/${SlectedId}`);
    const data = await res.data;
    const Roles = await api.get(`/user/getAllRoles?show=false`);
    if (res.status === 204) {
      setOpenDeleteSnackBar(true);
      setDeleteDialogOpen(false);
      setRoleData(Roles.data);
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
            <Switch
              color="primary"
              size="small"
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
        rows={RoleData || []}
        columns={RoleTableColumns.concat(actionColumn)}
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
        message={`Role Deleted Sucessfully!`}
        severity="success"
        setOpen={setOpenDeleteSnackBar}
        open={OpenDeleteSnackBar}
      />
    </div>
  );
}
