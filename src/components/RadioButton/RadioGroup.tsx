import {
  FormControl,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

interface RadioGroupProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroupComponent: FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <label style={{ fontSize: "12px" }}>{label} </label>
      <MuiRadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        row
        onChange={onChange}
        name={name}
        value={value}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio size="small" />}
            label={
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  margin: "0 ",
                }}
              >
                {option}
              </Typography>
            }
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroupComponent;
