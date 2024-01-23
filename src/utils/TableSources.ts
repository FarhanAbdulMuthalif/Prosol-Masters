import { GridColDef } from "@mui/x-data-grid";

export const PlantMasterColumns: GridColDef[] = [
  {
    field: "plantName",
    headerClassName: "super-app-theme--header",
    flex: 2,
    headerName: "Plant Name",
  },
  {
    field: "plantCode",
    headerClassName: "super-app-theme--header",
    headerName: "Pant Code",
    /*  renderCell: (params) => {
          return params.row.roles?.map((datarol: any) => datarol.name).join(", ");
        }, */
    flex: 2,
  },

  {
    field: "createdBy",
    headerClassName: "super-app-theme--header",
    headerName: "Created By",
    flex: 2,
  },
];
export const UserTableColumns: GridColDef[] = [
  {
    field: "email",
    headerClassName: "super-app-theme--header",
    flex: 2,
    headerName: "Email",
  },
  {
    field: "firstName",
    headerClassName: "super-app-theme--header",
    headerName: "FirstName",
    /*  renderCell: (params) => {
          return params.row.roles?.map((datarol: any) => datarol.name).join(", ");
        }, */
    flex: 1,
  },

  {
    field: "lastName",
    headerClassName: "super-app-theme--header",
    headerName: "LastName",
    flex: 1,
  },
  {
    field: "phone",
    headerClassName: "super-app-theme--header",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "business",
    headerClassName: "super-app-theme--header",
    headerName: "Business",
    flex: 1,
  },
];
