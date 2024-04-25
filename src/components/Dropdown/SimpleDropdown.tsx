import { PrimaryTextColor } from "@/styles/colorsCode";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface DropdownProps {
  label: string;
  value: number | string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: number | string; label: ReactNode }[];
}

const SimpleDropdown: FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const menuItemStyle = {
    fontSize: "12px",
    color: "#5E5873",
  };
  const SelectStyle = {
    fontSize: "12px",
    color: PrimaryTextColor,
    opacity: "0.7",
    height: "1.55rem",
  };
  return (
    <FormControl fullWidth>
      <Select
        id="dropdown"
        value={value?.toString()}
        sx={SelectStyle}
        name="id"
        placeholder={label}
        displayEmpty
        onChange={onChange}
        renderValue={(value) => {
          return value ? value : "Select Plant";
        }}
      >
        <MenuItem sx={menuItemStyle} value="">
          Select Plant
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} sx={menuItemStyle} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleDropdown;
