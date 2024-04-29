"use client";
import ColoredTabs from "@/components/Tabs/ColoredTabs";
import { ReactNode, useState } from "react";
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
  const tabs = [
    { label: `Description`, value: "description" },
    { label: `Plant`, value: "plant" },
    { label: `Code Logic`, value: "CodeLogic" },
    { label: `Attachment`, value: "attachment" },
    { label: `Physical Observation`, value: "physicalObservation" },
  ];
  const tabObjValue: Record<string, ReactNode> = {
    description: <MMDescription />,
    // plant: <MaterialMasterBasicFields />,
    // CodeLogic: <MaterialMasterBasicFields />,
    // attachment: <MaterialMasterBasicFields />,
    // physicalObservation: <MaterialMasterBasicFields />,
  };
  return (
    <section className="create-material-master-module">
      <div className="material-master-basic-fields">
        <MaterialMasterBasicFields />
      </div>
      <ColoredTabs
        value={tabValue}
        onChange={handleChange}
        tabs={tabs}
      ></ColoredTabs>

      {tabObjValue[tabValue]}
    </section>
  );
}
