// components/DataGrid.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowsProp,
} from "@mui/x-data-grid";
import React, { useContext } from "react";

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
  const ContextDataHub = useContext(UseContextHook);

  const { ThemeColor } = ContextDataHub;
  return (
    <div style={{ height: "73vh", backgroundColor: "white" }}>
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        columns={columns.map((col) => ({
          ...col,
          headerClassName: "custom-header",
        }))}
        rows={rows}
        onRowSelectionModelChange={onRowSelectionModelChange} // Pass the correct prop
        {...props}
        sx={{
          fontSize: "12px",
          "& .custom-header": {
            backgroundColor: `${ThemeColor.tertiaryColor}`, // Set your desired header color here
            color: ThemeColor.primaryColor,
          },
          "& .MuiDataGrid-columnHeaderCheckbox": {
            // Target checkbox header specifically
            backgroundColor: `${ThemeColor.tertiaryColor}`,
            color: ThemeColor.primaryColor,
          },
        }}
        scrollbarSize={0}
        // classes={DataGridHeaderCustomStyles} // Apply custom styles directly
      />
    </div>
  );
};

export default CustomDataGrid;
