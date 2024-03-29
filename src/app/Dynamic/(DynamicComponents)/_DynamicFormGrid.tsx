import { UseContextHook } from "@/Provides/UseContextHook";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import ReusableConfirmationDialog from "@/components/Dialog/ConformationDialog";
import api from "@/components/api";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { getAllPlantData } from "@/utils/masters/plant";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { DynamicFormsProps, PostCreateFieldData } from "../../../../TypesStore";

export default function DynamicFormGrid() {
  const UserDataCon = useContext(UseContextHook);
  const [selectedId, setselectedId] = useState(0);
  const [isConfirmationDeleteDialogOpen, setisConfirmationDeleteDialogOpen] =
    useState(false);
  const { setReusableSnackBar, ThemeColor } = UserDataCon;
  const [DynamicFormTableData, setDynamicFormTableData] = useState<
    DynamicFormsProps[]
  >([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/dynamic/getAllForm`);
        const data = await res.data;
        if (res.status === 200) {
          setDynamicFormTableData(data);
        }
      } catch (e: any) {
        if (!setReusableSnackBar) return;
        setReusableSnackBar((prev) => ({
          severity: "error",
          message: `Error: ${e?.message}`,
          open: true,
        }));
      }
    }
    fetchData();
  }, [setReusableSnackBar]);
  if (!setReusableSnackBar) return null;
  const actionColumn: GridColDef[] = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <DeleteForeverOutlinedIcon
              onClick={() => {
                console.log(params.row);
                setselectedId(params.row.id);
                setisConfirmationDeleteDialogOpen(true);
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
  const allKeys = DynamicFormTableData.reduce<string[]>((keys, obj) => {
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
        "createdAt",
        "createdBy",
        "updateAuditHistories",
        "updatedBy",
        "updatedAt",
      ].includes(key)
  );

  // console.log(filteredKeys);
  const masterDatagridColumns: GridColDef[] = filteredKeys?.map(
    (data: string) => {
      if (data === "formFields") {
        return {
          field: data,
          headerName: `${capitalizeFunc(data)}`,
          flex: 2,
          renderCell: (params) => {
            return params.row.formFields
              ?.map((datarol: PostCreateFieldData) => datarol.fieldName)
              .join(", ");
          },
        };
      }
      return {
        field: data,
        headerClassName: "super-app-theme--header",
        flex: 1,
        headerName: `${capitalizeFunc(data)}`,
        renderCell: (params: any) =>
          capitalizeFunc(params.row[data] ? params.row[data].toString() : ""),
      };
    }
  );
  const handleOpenConfirmationDeleteDialog = () => {
    setisConfirmationDeleteDialogOpen(false);
  };
  const handleDynamicFormDeleteHandler = async () => {
    try {
      const res = await api.delete(`/dynamic/deleteFormById/${selectedId}`);
      const data = await res.data;
      if (res.status === 204) {
        const dataDynamicForm = await getAllPlantData(`/dynamic/getAllForm`);
        setDynamicFormTableData(dataDynamicForm);
        setisConfirmationDeleteDialogOpen(false);
        setReusableSnackBar((prev) => ({
          severity: "success",
          message: `Dynamic Form Deleted Sucessfully!`,
          open: true,
        }));
      }
    } catch (e: any) {
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

  return (
    <div>
      <CustomDataGrid
        rows={DynamicFormTableData ? DynamicFormTableData : []}
        columns={
          masterDatagridColumns.length > 0
            ? masterDatagridColumns.concat(actionColumn)
            : []
        }
      />
      <ReusableConfirmationDialog
        open={isConfirmationDeleteDialogOpen}
        title="Are your sure you want Delete"
        content="you may lose your record"
        onConfirm={handleDynamicFormDeleteHandler}
        onCancel={handleOpenConfirmationDeleteDialog}
      />
    </div>
  );
}
