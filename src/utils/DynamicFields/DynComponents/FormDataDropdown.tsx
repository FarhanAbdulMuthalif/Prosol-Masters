import { PrimaryTextColor } from "@/styles/colorsCode";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

interface DropdownProps {
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: string[];
  name: string;
}

const FormDataDropdown: FC<DropdownProps> = ({
  label,
  value,
  onChange,
  options,
  name,
}) => {
  const menuItemStyle = {
    fontSize: "10px",
    color: "#5E5873",
    fontWeight: "600",
    // display: "flex",
    // justifyContent: "flex-end",
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "250px",
      },
    },
  };
  const SelectStyle = {
    fontSize: "10px",
    color: PrimaryTextColor,

    height: "1.55rem",
  };

  return (
    <Select
      name={name}
      fullWidth
      value={value ? value : ""}
      sx={SelectStyle}
      placeholder={label}
      displayEmpty
      onChange={onChange}
      MenuProps={MenuProps}
      renderValue={(value) => {
        return value ? value : label;
      }}
    >
      <MenuItem sx={menuItemStyle} value="" disabled>
        {label}
      </MenuItem>

      {options.map((option) => (
        <MenuItem sx={menuItemStyle} key={option} value={option}>
          {capitalizeFunc(option)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FormDataDropdown;
