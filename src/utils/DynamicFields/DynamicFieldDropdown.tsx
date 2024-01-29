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
    color: "brown",

    height: "2.2rem",
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
          <MenuItem key={option.value} sx={menuItemStyle} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DynamicSingleSelectDropdown;
