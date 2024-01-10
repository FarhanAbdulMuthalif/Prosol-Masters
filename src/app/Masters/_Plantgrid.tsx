import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import api from "@/components/api";
import { PlantMasterColumns } from "@/utils/TableSources";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
export default function Plantgrid({
  selectionIDArr,
  handleOpenConfirmationDeleteDialog,
}: {
  selectionIDArr: (val: GridRowId[]) => void;
  handleOpenConfirmationDeleteDialog: (val: number) => void;
}) {
  const PlantDataCon = useContext(UseContextHook);
  const { PlantData, setPlantData } = PlantDataCon;
  const SinglePlantStatusHandler = async (id: number) => {
    const res = await api.patch(`updatePlantStatusById/${id}`);
    const dataPlantUpdate = await res.data;
    const dataPlant = await getAllPlantData("getAllPlant");
    console.log(dataPlantUpdate);
    if (res.status === 200) {
      if (setPlantData) {
        setPlantData(dataPlant);
      }
    }
  };
  const initialRenderdata = [];
  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("getAllPlant");
      if (setPlantData) {
        setPlantData(res.data);
      }
    };
    fetchData();
  }, [setPlantData]);
  const actionColumn: GridColDef[] = [
    {
      field: "status",
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
                SinglePlantStatusHandler(params.row.id);
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
              }}
              sx={{ fontSize: "1rem", color: "black", cursor: "pointer" }}
            />

            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
                handleOpenConfirmationDeleteDialog(params.row.id);
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
        rows={PlantData || []}
        columns={PlantMasterColumns.concat(actionColumn)}
        onRowSelectionModelChange={(item) => {
          selectionIDArr(item);
        }}
      />
    </div>
  );
}
