import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface DropdownProps {
  label: string;
  value: boolean;
  onChange: (event: SelectChangeEvent) => void;
  options: { value: boolean; label: ReactNode; id: number }[];
  name: string;
}

const BooleanSingleSelectDropdown: FC<DropdownProps> = ({
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
  const DwnValue = options.find((data) => data.value === value)?.label;

  return (
    <FormControl fullWidth>
      <Select
        name={name}
        value={DwnValue?.toString()}
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
            key={option.id}
            sx={menuItemStyle}
            value={option.value ? 1 : 0}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BooleanSingleSelectDropdown;
