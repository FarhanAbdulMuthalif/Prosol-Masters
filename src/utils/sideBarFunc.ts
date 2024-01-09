import { GridClasses } from "@mui/x-data-grid";

export const toogleSidebarHandler = (data: boolean) => {
  return !data;
};

export const DataGridHeaderCustomStyles: Partial<GridClasses> = {
  root: "custom-datagrid",
};
