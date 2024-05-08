import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import BasicStepper from "@/components/Stepper/BasicStepper";
import { getMMDescriptionTabData } from "@/utils/MaterialMasters/MMfunctions";
import { ReactNode, useState } from "react";
import { StepperStepInfo } from "../../../../../TypesStore";
import MMDescriptionCharacteristic from "./(MMDescriptionAction)/_MMDescriptionCharacteristic";
import MMDescriptionEquipment from "./(MMDescriptionAction)/_MMDescriptionEquipment";
import MMDescriptionVendor from "./(MMDescriptionAction)/_MMDescriptionVendor";
import MMHSN from "./(MMDescriptionAction)/_MMHSN";

export default function MMDescription() {
  const [activeStep, setactiveStep] = useState(0);

  const steps: StepperStepInfo[] =
    getMMDescriptionTabData().filter((dt): dt is StepperStepInfo =>
      Boolean(dt)
    ) || [];
  const characteristics = <MMDescriptionCharacteristic />;
  const vendor = <MMDescriptionVendor />;
  const equipment = <MMDescriptionEquipment />;
  const HSN = <MMHSN />;
  const dataWithElemnet: Record<string, ReactNode> = {
    characteristics,
    vendor,
    equipment,
    HSN,
  };
  const renderDescription: Record<number, ReactNode> = {};
  const handleNext = () => {
    if (activeStep === 3) return;
    setactiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  ``;
  const handleBack = () => {
    setactiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const indexTab = steps.map((data, index) => {
    return { label: data?.label, value: data?.value, index: index };
  });
  indexTab.forEach((element) => {
    renderDescription[element?.index + 1] =
      dataWithElemnet[element?.value || ""];
  });
  return (
    <>
      <div className="material-master-description-fields-content">
        <BasicStepper steps={steps} activeStep={activeStep} />
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
