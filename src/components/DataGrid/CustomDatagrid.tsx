// components/DataGrid.tsx
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";
import React from "react";

interface CustomDataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  onRowSelectionModelChange?: (selectionModel: GridRowId[]) => void;
  // You can add any additional custom props here
  // Example: customProp?: string;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  columns,
  rows,
  onRowSelectionModelChange,
  ...props
}) => {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowSelectionModelChange={onRowSelectionModelChange} // Pass the correct prop
        {...props}
        sx={{ fontSize: "12px" }}
      />
    </div>
  );
};

export default CustomDataGrid;
