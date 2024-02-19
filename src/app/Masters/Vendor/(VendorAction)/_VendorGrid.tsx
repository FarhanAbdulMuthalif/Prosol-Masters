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
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

export default function VendorGrid({
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
  const getAllLinkName = (masters[ExactPath] as mastersVendorSubsubFields)
    ?.getAll;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`${getAllLinkName}`);
        if (setPlantData) {
          setPlantData(res.data);
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
    fetchData();
  }, [setPlantData, getAllLinkName, setReusableSnackBar]);
  if (!SelectedMasterDatatab || !PlantData) {
    return null;
  }

  const SinglePlantStatusHandler = async (id: number) => {
    try {
      const res = await api.patch(
        `${
          (masters[ExactPath] as mastersVendorSubsubFields)?.updateStatus
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
        `${(masters[ExactPath] as mastersVendorSubsubFields)?.keyName}Status`,
        "createdAt",
        "createdBy",
        "updateAuditHistories",
      ].includes(key)
  );

  // console.log(filteredKeys);
  const masterDatagridColumns: GridColDef[] = [
    {
      field: "shortDescName",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `Short Desc`,
      renderCell: (params) =>
        capitalizeFunc(
          params.row.shortDescName ? params.row.shortDescName.toString() : ""
        ),
    },
    {
      field: "name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `Name`,
      renderCell: (params) => capitalizeFunc(params.row.name),
    },
    {
      field: "address",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `Address`,
      renderCell: (params) => capitalizeFunc(params.row.address),
    },
    {
      field: "city",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `City`,
      renderCell: (params) => capitalizeFunc(params.row.city),
    },
    {
      field: "state",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `State`,
      renderCell: (params) => capitalizeFunc(params.row.state),
    },
    {
      field: "country",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `Country`,
      renderCell: (params) => capitalizeFunc(params.row.country),
    },
    {
      field: "email",
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `Email`,
      renderCell: (params) => capitalizeFunc(params.row.email),
    },
  ];
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
              checked={params.row[`status`]}
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
