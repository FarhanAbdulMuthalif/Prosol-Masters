import { PrimaryTextColor } from "@/styles/colorsCode";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
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
  name: string;
}

const NameSingleSelectDropdown: FC<DropdownProps> = ({
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
        value={value.toString()}
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
          <MenuItem key={option.value} sx={menuItemStyle} value={option.value}>
            {capitalizeFunc(option.label ? option.label?.toString() : "")}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default NameSingleSelectDropdown;
