import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import api from "@/components/api";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { splitWordByCapitalLetter } from "@/utils/splitWordByCapitalLetter";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  mastersProps,
  mastersVendorSubsubFields,
} from "../../../../../TypesStore";

export default function AttributeGrid({
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
  const ArrColumns = ["id", "attributeName", "fieldType", "listUom"];
  // console.log(filteredKeys);
  const masterDatagridColumns: GridColDef[] = ArrColumns.map((data: string) => {
    if (data === "listUom") {
      return {
        field: "listUom",
        headerClassName: "super-app-theme--header",
        flex: 1,

        headerName: `List Uom`,
        renderCell: (params: any) => {
          return params.row.listUom
            ?.map((dta: any) => dta.attributeUomName)
            .join(", ");
        },
      };
    }
    return {
      field: data,
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `${splitWordByCapitalLetter(capitalizeFunc(data))}`,
    };
  });

  const actionColumn: GridColDef[] = [
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
