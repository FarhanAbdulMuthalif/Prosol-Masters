import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableSwitch from "@/components/SwitchToogle/SimpleSwitch";
import api from "@/components/api";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  ValidMasterGeneralDataTabs,
  mastersGeneralSubFields,
  mastersProps,
} from "../../../../../TypesStore";

export default function Generalgrid({
  selectionIDArr,
  handleOpenConfirmationDeleteDialog,
  EditSetRecordAndGotoAction,
}: {
  selectionIDArr: (val: GridRowId[]) => void;
  handleOpenConfirmationDeleteDialog: (val: number) => void;
  EditSetRecordAndGotoAction: (val: any) => void;
}) {
  const PlantDataCon = useContext(UseContextHook);
  const {
    PlantData,
    setPlantData,
    masters,
    SelectedMasterDatatab,
    ThemeColor,
    setReusableSnackBar,
  } = PlantDataCon;
  const pathName = usePathname();
  const ExactPathArr = pathName
    .split("/")
    .filter((n) => n)
    .filter((n) => n !== "Masters");
  const ExactPath = (
    ExactPathArr.length > 0 ? ExactPathArr : ["Plant"]
  )[0] as keyof mastersProps;
  const getAllLinkName = (masters[ExactPath] as mastersGeneralSubFields)[
    SelectedMasterDatatab as ValidMasterGeneralDataTabs
  ]?.getAll;
  console.log(ExactPath);
  console.log(getAllLinkName);
  console.log(SelectedMasterDatatab);
  console.log(
    (masters[ExactPath] as mastersGeneralSubFields)[
      SelectedMasterDatatab as ValidMasterGeneralDataTabs
    ]?.getAll
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`${getAllLinkName}`);
        console.log(res);
        if (setPlantData) {
          setPlantData(res.data);
        }
      } catch (e: any) {
        console.log(e?.response);
        if (!setReusableSnackBar) return;
        if (e?.response.status === 404) return;
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
  }, [setPlantData, getAllLinkName, setReusableSnackBar]);
  if (!SelectedMasterDatatab || !PlantData) {
    return null;
  }

  const SinglePlantStatusHandler = async (id: number) => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as mastersGeneralSubFields)[
            SelectedMasterDatatab as ValidMasterGeneralDataTabs
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
          (masters[ExactPath] as mastersGeneralSubFields)[
            SelectedMasterDatatab as ValidMasterGeneralDataTabs
          ]?.keyName
        }Status`,
        "createdAt",
        "createdBy",
        "updateAuditHistories",
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

          headerName: `${capitalizeFunc(data)}`,
          renderCell: (params: any) => {
            return params.row.plant.plantName;
          },
        };
      }
      if (data === "storageLocation") {
        return {
          field: "storageLocation",
          headerClassName: "super-app-theme--header",
          flex: 1,

          headerName: `${capitalizeFunc(data)}`,
          renderCell: (params: any) => {
            return params.row.storageLocation.storageLocationName;
          },
        };
      }
      if (data === "id") {
        return {
          field: data,
          headerClassName: "super-app-theme--header",
          flex: 0.5,
          headerName: `${capitalizeFunc(data)}`,
        };
      }
      return {
        field: data,
        headerClassName: "super-app-theme--header",
        flex: 1,
        headerName: `${capitalizeFunc(data)}`,
      };
    }
  );
  const actionColumn: GridColDef[] = [
    {
      field: `${
        (masters[ExactPath] as mastersGeneralSubFields)[
          SelectedMasterDatatab as ValidMasterGeneralDataTabs
        ]?.keyName
      }Status`,
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <ReusableSwitch
              checked={
                params.row[
                  `${
                    (masters[ExactPath] as mastersGeneralSubFields)[
                      SelectedMasterDatatab as ValidMasterGeneralDataTabs
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
              sx={{
                fontSize: "1rem",
                color: ThemeColor.primaryColor,
                cursor: "pointer",
              }}
            />

            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
                handleOpenConfirmationDeleteDialog(params.row.id);
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
        rows={PlantData || []}
        columns={
          masterDatagridColumns.length > 0
            ? masterDatagridColumns.concat(actionColumn)
            : []
        }
        onRowSelectionModelChange={(item) => {
          selectionIDArr(item);
        }}
      />
    </div>
  );
}
