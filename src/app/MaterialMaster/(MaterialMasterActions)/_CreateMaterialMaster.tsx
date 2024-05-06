"use client";
import ColoredTabs from "@/components/Tabs/ColoredTabs";
import { MaterialMasteresData } from "@/utils/MaterialMasters/MMData";
import { getMMTabData } from "@/utils/MaterialMasters/MMfunctions";
import { ReactNode, useState } from "react";
import MMPlant from "./(MMFieldRender)/(MMPlantAction)/_MMPlant";
import MMDescription from "./(MMFieldRender)/_MMDescription";
import MaterialMasterBasicFields from "./(MMFieldRender)/_MaterialMasterBasicFields";

export default function CreateMaterialMaster() {
  const [tabValue, settabValue] = useState("description");

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "description" | "plant" | "CodeLogic" | "attachment"
  ) => {
    settabValue(newValue);
  };
  const MMSourceDesc = MaterialMasteresData.formFields?.filter(
    (data) => data.name === "sourceDesc"
  )[0];
  // let tabs = [
  //   { label: `Description`, value: "description" },
  //   { label: `Plant`, value: "plant" },
  //   { label: `Code Logic`, value: "CodeLogic" },
  //   { label: `Attachment`, value: "attachment" },
  //   { label: `Physical Observation`, value: "physicalObservation" },
  // ];
  const tabs = getMMTabData() || [];
  const tabObjValue: Record<string, ReactNode> = {
    description: <MMDescription />,
    plant: <MMPlant />,
    // CodeLogic: <MaterialMasterBasicFields />,
    // attachment: <MaterialMasterBasicFields />,
    // physicalObservation: <MaterialMasterBasicFields />,
  };

  return (
    <section className="create-material-master-module">
      <div className="material-master-basic-fields">
        <MaterialMasterBasicFields />
      </div>
      <div className="material-master-description-fields">
        <ColoredTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></ColoredTabs>

        {tabObjValue[tabValue]}
      </div>
    </section>
  );
}
