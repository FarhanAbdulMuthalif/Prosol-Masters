import { SliderProps } from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";

const ReusableSlider: React.FC<SliderProps> = ({ ...props }) => {
  return <Slider {...props} />;
};

export default ReusableSlider;
