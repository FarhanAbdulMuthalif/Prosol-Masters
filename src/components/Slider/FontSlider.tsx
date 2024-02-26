// ReusableFontSlider.tsx
import { SliderProps } from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";

type ReusableFontSliderProps = {
  value: number;
  onChange: (event: Event, value: number | number[], id: number) => void;
  idRecord: number;
} & Omit<SliderProps, "onChange" | "value" | "id">; // Exclude conflicting props

const ReusableFontSlider: React.FC<ReusableFontSliderProps> = ({
  value,
  onChange,
  idRecord,
  ...props
}) => {
  return (
    <Slider
      value={value}
      onChange={(event, newValue) => onChange(event, newValue, idRecord)}
      {...props}
    />
  );
};

export default ReusableFontSlider;
