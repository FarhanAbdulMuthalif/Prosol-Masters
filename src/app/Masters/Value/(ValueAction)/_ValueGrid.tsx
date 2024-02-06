import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import api from "@/components/api";
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

export default function ValueGrid({
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
        "updatedAt",
        "createdBy",
        "updatedBy",
      ].includes(key)
  );
  const ArrColumns = [
    "id",
    "value",
    "abbreviation",
    "abbreviationUnit",
    "equivalent",
    "equivalentUnit",
    "likelyWords",
  ];
  // console.log(filteredKeys);
  const masterDatagridColumns: GridColDef[] = ArrColumns.map((data: string) => {
    if (data === "abbreviationUnit") {
      return {
        field: "abbreviationUnit",
        headerClassName: "super-app-theme--header",
        flex: 1,

        headerName: `AbbreviationUnit`,
        renderCell: (params: any) => {
          return params?.row?.abbreviationUnit?.attributeUomName;
        },
      };
    }
    if (data === "equivalentUnit") {
      return {
        field: "equivalentUnit",
        headerClassName: "super-app-theme--header",
        flex: 1,

        headerName: `EquivalentUnit`,
        renderCell: (params: any) => {
          return params?.row?.equivalentUnit?.attributeUomName;
        },
      };
    }
    return {
      field: data,
      headerClassName: "super-app-theme--header",
      flex: 1,
      headerName: `${data.charAt(0).toUpperCase() + data.slice(1)}`,
    };
  });
  // console.log(filteredKeys);

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
