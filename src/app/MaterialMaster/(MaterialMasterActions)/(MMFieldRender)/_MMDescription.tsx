import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useContext, useState } from "react";
import MMDescriptionCharacteristic from "./(MMDescriptionAction)/_MMDescriptionCharacteristic";
import MMDescriptionEquipment from "./(MMDescriptionAction)/_MMDescriptionEquipment";
import MMDescriptionVendor from "./(MMDescriptionAction)/_MMDescriptionVendor";

export default function MMDescription() {
  const [activeStep, setactiveStep] = useState(0);
  const { ThemeColor } = useContext(UseContextHook);
  const steps = [
    {
      label: "Characteristic Details",
      description: "Enter Characteristic Details",
      content: <MMDescriptionCharacteristic />,
    },
    {
      label: "Equipment Details",
      description: "Enter Equipmentr Details",
      content: <MMDescriptionEquipment />,
    },
    {
      label: "Vendor Details",
      description: "Enter Vendor Details",
      content: <MMDescriptionVendor />,
    },
  ];
  const handleNext = () => {
    if (activeStep > steps.length) return;
    setactiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setactiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className="material-master-description-fields">
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((step, index) => (
          <Step key={step.label} sx={{}}>
            <StepLabel
              sx={{
                "& .MuiStepIcon-root": {
                  // Base icon styles
                  color: "lightgray", // Default icon color
                },
                "& .Mui-active": {
                  // Active icon styles
                  color: ThemeColor.primaryColor, // Active icon color
                },
                "& .Mui-completed": {
                  // Completed icon styles
                  color: ThemeColor.secondaryColor, // Completed icon color
                },
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="material-master-description-fields-action">
        <OutlinedButton disabled={activeStep === 0} onClick={handleBack}>
          Back
        </OutlinedButton>
        <FillButton onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </FillButton>
      </div>
    </div>
  );
}
