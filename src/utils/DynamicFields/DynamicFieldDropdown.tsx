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
  options: { optionValue: string }[];
  name: string;
}

const DynamicSingleSelectDropdown: FC<DropdownProps> = ({
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

    height: "1.55rem",
  };
  return (
    <FormControl fullWidth>
      <Select
        name={name}
        value={value ? value.toString() : ""}
        sx={SelectStyle}
        placeholder={label}
        displayEmpty
        onChange={onChange}
        renderValue={(value) => {
          return value ? value : label;
        }}
      >
        <MenuItem sx={menuItemStyle} value="" disabled>
          {label}
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.optionValue}
            sx={menuItemStyle}
            value={option.optionValue}
          >
            {option.optionValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DynamicSingleSelectDropdown;
