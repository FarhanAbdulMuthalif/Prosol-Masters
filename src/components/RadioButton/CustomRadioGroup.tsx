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

const CustomRadioGroupComponent: FC<RadioGroupProps> = ({
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
        justifyContent: "space-between",
        gap: "5px",
      }}
    >
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
          gap: "10px",
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
                  fontSize: "12px",
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

export default CustomRadioGroupComponent;
