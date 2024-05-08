// components/ReusableStepper.tsx
import { UseContextHook } from "@/Provides/UseContextHook";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { Step, StepLabel, Stepper } from "@mui/material";
import { FC, useContext } from "react";
import { ReusableStepperProps } from "../../../TypesStore";

const BasicStepper: FC<ReusableStepperProps> = ({ steps, activeStep }) => {
  const { ThemeColor } = useContext(UseContextHook);
  return (
    <Stepper
      activeStep={activeStep}
      orientation="horizontal"
      sx={{ padding: "5px 0" }}
    >
      {steps?.map((step, index) => (
        <Step key={step?.label}>
          <StepLabel
            sx={{
              color: PrimaryTextColor,
              "& .MuiStepIcon-root": {
                color: "lightgray", // Default icon color
              },
              "& .Mui-active": {
                color: ThemeColor.primaryColor, // Active icon color
              },
              "& .Mui-completed": {
                color: ThemeColor.secondaryColor, // Completed icon color
              },
            }}
          >
            {step?.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default BasicStepper;
