import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import api from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useContext, useEffect } from "react";
import { ValidMasterDataTabs } from "../../../TypesStore";
export default function Plantgrid({
  selectionIDArr,
  handleOpenConfirmationDeleteDialog,
  EditSetRecordAndGotoAction,
}: {
  selectionIDArr: (val: GridRowId[]) => void;
  handleOpenConfirmationDeleteDialog: (val: number) => void;
  EditSetRecordAndGotoAction: (val: any) => void;
}) {
  const PlantDataCon = useContext(UseContextHook);
  const { PlantData, setPlantData, masters, SelectedMasterDatatab } =
    PlantDataCon;
  const getAllLinkName =
    masters[SelectedMasterDatatab as ValidMasterDataTabs].getAll;
  useEffect(() => {
    console.log(getAllLinkName);
    const fetchData = async () => {
      const res = await api.get(`${getAllLinkName}`);
      console.log(res);
      if (setPlantData) {
        setPlantData(res.data);
      }
    };
    fetchData();
  }, [setPlantData, getAllLinkName]);
  if (!SelectedMasterDatatab || !PlantData) {
    return null;
  }

  const SinglePlantStatusHandler = async (id: number) => {
    const res = await api.patch(
      `${
        masters[SelectedMasterDatatab as ValidMasterDataTabs].updateStatus
      }/${id}`
    );
    const dataPlantUpdate = await res.data;

    const dataPlant = await getAllPlantData(`${getAllLinkName}`);
    console.log(dataPlantUpdate);
    if (res.status === 200) {
      if (setPlantData) {
        setPlantData(dataPlant);
      }
    }
  };

  const allKeys = PlantData.reduce((keys, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, []);

  // Remove specific keys
  const filteredKeys = allKeys.filter(
    (key: string) =>
      ![
        `${
          SelectedMasterDatatab.charAt(0).toLowerCase() +
          SelectedMasterDatatab.slice(1)
        }Status`,
        "createdAt",
        "updatedAt",
        "createdBy",
        "updatedBy",
      ].includes(key)
  );

  // console.log(filteredKeys);
  const masterDatagridColumns: GridColDef[] = filteredKeys?.map(
    (data: string) => {
      if (data === "plant") {
        return {
          field: "plant",
          headerClassName: "super-app-theme--header",
          flex: 1,

          headerName: `${data.charAt(0).toUpperCase() + data.slice(1)}`,
          renderCell: (params: any) => {
            return params.row.plant.plantName;
          },
        };
      }
      return {
        field: data,
        headerClassName: "super-app-theme--header",
        flex: 1,
        headerName: `${data.charAt(0).toUpperCase() + data.slice(1)}`,
      };
    }
  );
  const actionColumn: GridColDef[] = [
    {
      field: `${
        SelectedMasterDatatab.charAt(0).toLowerCase() +
        SelectedMasterDatatab.slice(1)
      }Status`,
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <Switch
              color="primary"
              size="small"
              checked={
                params.row[
                  `${
                    SelectedMasterDatatab.charAt(0).toLowerCase() +
                    SelectedMasterDatatab.slice(1)
                  }Status`
                ]
              }
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
                EditSetRecordAndGotoAction(params.row);
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
        columns={masterDatagridColumns.concat(actionColumn)}
        onRowSelectionModelChange={(item) => {
          selectionIDArr(item);
        }}
      />
    </div>
  );
}
