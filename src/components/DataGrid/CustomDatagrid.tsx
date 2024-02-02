// components/DataGrid.tsx
import { DataGridHeaderCustomStyles } from "@/utils/sideBarFunc";
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
    <div style={{ height: "73vh", backgroundColor: "white" }}>
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns}
        rows={rows}
        onRowSelectionModelChange={onRowSelectionModelChange} // Pass the correct prop
        {...props}
        sx={{
          fontSize: "12px",
          "&  .MuiDataGrid-virtualScroller css-qvtrhg-MuiDataGrid-virtualScroller":
            {
              height: "4px",
            },
        }}
        scrollbarSize={0}
        classes={DataGridHeaderCustomStyles} // Apply custom styles directly
      />
    </div>
  );
};

export default CustomDataGrid;
