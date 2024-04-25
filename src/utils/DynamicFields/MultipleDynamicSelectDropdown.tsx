import { PrimaryTextColor } from "@/styles/colorsCode";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface DropdownProps {
  label: string;
  value: number | string;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: string }[];
  name: string;
}

const MultipleDynamicSelectDropdown: FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  name,
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
        name={name}
        value={value as any}
        sx={SelectStyle}
        placeholder={label}
        displayEmpty
        multiple
        onChange={onChange}
        renderValue={(selected) => {
          if (options.length === 0) {
            return "Select option";
          }
          return Array.isArray(selected)
            ? (selected as string[]).join(", ")
            : [];
        }}
      >
        <MenuItem sx={menuItemStyle} value="" disabled>
          {label}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} sx={menuItemStyle} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleDynamicSelectDropdown;
