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

const SingleSelectDropdown: FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const menuItemStyle = {
    fontSize: "10px",
    color: "#5E5873",
    fontWeight: "600",
  };
  const SelectStyle = {
    fontSize: "10px",
    color: "brown",

    height: "2.2rem",
  };
  return (
    <FormControl fullWidth>
      <Select
        id="dropdown"
        value={
          value === undefined || value === null || options.length === 0
            ? ""
            : value.toString()
        }
        sx={SelectStyle}
        placeholder={label}
        displayEmpty
        onChange={onChange}
        renderValue={(value) => {
          return value ? value : label;
        }}
      >
        <MenuItem sx={menuItemStyle} value={``}>
          {label}
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

export default SingleSelectDropdown;
