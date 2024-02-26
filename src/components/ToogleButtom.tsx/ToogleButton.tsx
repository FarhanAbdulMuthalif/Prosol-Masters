import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";

interface ReusableToggleButtonProps {
  value: string;
  onChange: (value: string, id: number) => void;
  options: { type: string; label: string }[];
  id: number;
}

const ReusableToggleButton: React.FC<ReusableToggleButtonProps> = ({
  value,
  onChange,
  options,
  id,
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => newValue && onChange(newValue, id)}
      aria-label="toggle button group"
      size="small"
    >
      {options.map((option) => (
        <ToggleButton
          key={option.type}
          value={option.type}
          aria-label={option.type}
          sx={{ fontWeight: option.type }}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ReusableToggleButton;
