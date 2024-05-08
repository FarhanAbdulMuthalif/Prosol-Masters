import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import BasicStepper from "@/components/Stepper/BasicStepper";
import { getMMPlantTabData } from "@/utils/MaterialMasters/MMfunctions";
import { ReactNode, useState } from "react";
import { StepperStepInfo } from "../../../../../../TypesStore";
import MMPlantGeneral from "./(SubMMPlantComp))/_MMPlantGeneral";
import MMPlantMRPData from "./(SubMMPlantComp))/_MMPlantMRPData";
import MMPlantPlant from "./(SubMMPlantComp))/_MMPlantPlant";
import MMPlantSalesAndOthers from "./(SubMMPlantComp))/_MMPlantSalesAndOthers";

export default function MMPlant() {
  const [activeStep, setactiveStep] = useState(0);
  const steps: StepperStepInfo[] =
    getMMPlantTabData().filter((dt): dt is StepperStepInfo => Boolean(dt)) ||
    [];
  const indexTab = steps.map((data, index) => {
    return { label: data?.label, value: data?.value, index: index };
  });
  const plant = <MMPlantPlant />;
  const general = <MMPlantGeneral />;
  const MRPData = <MMPlantMRPData />;
  const salesAndOthers = <MMPlantSalesAndOthers />;
  const dataWithElemnet: Record<string, ReactNode> = {
    plant,
    general,
    MRPData,
    salesAndOthers,
  };
  const renderPlant: Record<number, ReactNode> = {};
  const handleNext = () => {
    if (activeStep === 4) return;
    setactiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  ``;
  const handleBack = () => {
    setactiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  indexTab.forEach((element) => {
    renderPlant[element?.index + 1] = dataWithElemnet[element?.value || ""];
  });
  console.log(steps);
  return (
    <>
      <div className="material-master-plant">
        <BasicStepper steps={steps} activeStep={activeStep} />
        {renderPlant[activeStep + 1]}
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
