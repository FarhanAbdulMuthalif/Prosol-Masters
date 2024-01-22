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
        id="dropdown"
        value={value.toString()}
        sx={SelectStyle}
        placeholder={label}
        displayEmpty
        onChange={onChange}
        renderValue={(value) => {
          console.log(value);
          return value ? value : label;
        }}
      >
        <MenuItem sx={menuItemStyle} value="">
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
