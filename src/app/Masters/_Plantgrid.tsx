import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import CustomDataGrid from "@/components/DataGrid/CustomDatagrid";
import { URL_FIX_BASE_PATH } from "@/components/api";
import { PlantMasterColumns } from "@/utils/TableSources";
import useFetch from "@/utils/masters/plant";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

export default function Plantgrid() {
  const { data, loading, error } = useFetch("getAllPlant");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className="export-import-header-master-div">
        <OutlinedButton startIcon={<FileDownloadIcon />}>
          <a href={`${URL_FIX_BASE_PATH}/exportTemplatePlant`}>
            Download Template
          </a>
        </OutlinedButton>
        <FillButton onClick={handleClick}>Export Type</FillButton>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <a href={`${URL_FIX_BASE_PATH}/pdfPlantReport`}>PDF Format</a>
        </MenuItem>
        <MenuItem>
          <a href={`${URL_FIX_BASE_PATH}/exportDataPlant`}>Excel Format</a>
        </MenuItem>
      </Menu>
      <CustomDataGrid rows={data || []} columns={PlantMasterColumns} />
    </div>
  );
}
