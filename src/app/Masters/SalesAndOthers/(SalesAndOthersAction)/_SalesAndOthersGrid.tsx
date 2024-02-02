import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import api from "@/components/api";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  ValidMastersSalesAndOthersTabs,
  mastersProps,
  mastersSalesAndOthersSubFields,
} from "../../../../../TypesStore";

export default function SalesAndOthersGrid({
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
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  const getAllLinkName = (masters[ExactPath] as mastersSalesAndOthersSubFields)[
    SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
  ]?.getAll;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`${getAllLinkName}`);
        if (setPlantData) {
          setPlantData(res.data);
        }
      } catch (e: any) {
        console.log(e?.response);
      }
    };
    fetchData();
  }, [setPlantData, getAllLinkName]);
  if (!SelectedMasterDatatab || !PlantData) {
    return null;
  }

  const SinglePlantStatusHandler = async (id: number) => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as mastersSalesAndOthersSubFields)[
            SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
          ]?.updateStatus
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
    } catch (e: any) {
      console.log(e?.response);
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
          (masters[ExactPath] as mastersSalesAndOthersSubFields)[
            SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
          ]?.keyName
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
      if (data === "salesOrganization") {
        return {
          field: "salesOrganization",
          headerClassName: "super-app-theme--header",
          flex: 1,

          headerName: `${data.charAt(0).toUpperCase() + data.slice(1)}`,
          renderCell: (params: any) => {
            return params.row.salesOrganization.soName;
          },
        };
      }
      if (data === "id") {
        return {
          field: data,
          headerClassName: "super-app-theme--header",
          flex: 0.5,
          headerName: `${data.charAt(0).toUpperCase() + data.slice(1)}`,
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
        (masters[ExactPath] as mastersSalesAndOthersSubFields)[
          SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
        ]?.keyName
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
                    (masters[ExactPath] as mastersSalesAndOthersSubFields)[
                      SelectedMasterDatatab as ValidMastersSalesAndOthersTabs
                    ]?.keyName
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
