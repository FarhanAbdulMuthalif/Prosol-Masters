import { PrimaryTextColor } from "@/styles/colorsCode";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC } from "react";

interface MultipleSelectProps {
  label: string;
  values: number[];
  options: { value: number; label: string }[];
  onChange: (e: SelectChangeEvent) => void;
  name: string;
  fullWidth?: boolean;
}

const ReusableMultipleSelect: FC<MultipleSelectProps> = ({
  label,
  values,
  options,
  onChange,
  name,
  fullWidth,
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
    <Select
      name={name}
      multiple
      sx={SelectStyle}
      value={values as any}
      displayEmpty
      fullWidth={fullWidth}
      renderValue={(selected) => {
        if (values.length === 0) {
          return label;
        }

        const selectedLabels = options
          .filter((option) => selected.includes(option.value as any))
          .map((option) => option.label);

        return selectedLabels.join(", ");
      }}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem sx={menuItemStyle} key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ReusableMultipleSelect;
