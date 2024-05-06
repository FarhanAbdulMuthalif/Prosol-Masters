import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import { getMMDescriptionTabData } from "@/utils/MaterialMasters/MMfunctions";
import { Step, StepLabel, Stepper } from "@mui/material";
import { ReactNode, useContext, useState } from "react";
import MMDescriptionCharacteristic from "./(MMDescriptionAction)/_MMDescriptionCharacteristic";
import MMDescriptionEquipment from "./(MMDescriptionAction)/_MMDescriptionEquipment";
import MMDescriptionVendor from "./(MMDescriptionAction)/_MMDescriptionVendor";

export default function MMDescription() {
  const [activeStep, setactiveStep] = useState(0);
  const { ThemeColor } = useContext(UseContextHook);
  // const steps = [
  //   {
  //     label: "Characteristic Details",
  //     description: "Enter Characteristic Details",
  //   },
  //   {
  //     label: "Equipment Details",
  //     description: "Enter Equipmentr Details",
  //   },
  //   {
  //     label: "Vendor Details",
  //     description: "Enter Vendor Details",
  //   },
  // ];
  const steps = getMMDescriptionTabData() || [];
  const renderDescription: Record<number, ReactNode> = {
    1: <MMDescriptionCharacteristic />,
    2: <MMDescriptionEquipment />,
    3: <MMDescriptionVendor />,
  };
  const handleNext = () => {
    if (activeStep === 2) return;
    setactiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setactiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <div className="material-master-description-fields-content">
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
          sx={{ padding: "5px 0" }}
        >
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
        {renderDescription[activeStep + 1]}
      </div>
      <div className="material-master-description-fields-action">
        <OutlinedButton disabled={activeStep === 0} onClick={handleBack}>
          Back
        </OutlinedButton>
        <FillButton onClick={handleNext} disabled={activeStep > 2}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </FillButton>
      </div>
    </>
  );
}
