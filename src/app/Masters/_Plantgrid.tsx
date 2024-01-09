import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import { PlantMasterColumns } from "@/utils/TableSources";
import useFetch from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
export default function Plantgrid({
  selectionIDArr,
}: {
  selectionIDArr: (val: GridRowId[]) => void;
}) {
  const { data, loading, error } = useFetch("getAllPlant");
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
              onChange={(e) => {}}
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
              sx={{ fontSize: "1rem", color: "black" }}
            />

            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
              }}
              sx={{ fontSize: "1rem", color: "black" }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <CustomDataGrid
        rows={data || []}
        columns={PlantMasterColumns.concat(actionColumn)}
        onRowSelectionModelChange={(item) => {
          selectionIDArr(item);
        }}
      />
    </div>
  );
}
