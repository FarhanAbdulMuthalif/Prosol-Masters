"use client";
import CustomTabs from "@/components/Tabs/Tabs";
import { ReactNode, useState } from "react";
import Plantgrid from "./_Plantgrid";
import "./style.scss";

export default function Masters() {
  const [tabValue, settabValue] = useState("table");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    settabValue(newValue);
  };
  const tabs = [
    { label: "Plant Table", value: "table" },
    { label: "Create Plant", value: "create" },
  ];

  const tabRenderValuePlant: Record<string, ReactNode> = {
    table: <Plantgrid />,
  };
  return (
    <section className="masters-main-content-section">
      <div className="masters-main-content-header">
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
          sx={{
            borderBottom: ".5px solid #c5ccd4",
          }}
          //   sx={{ borderBottom: "1px solid black" }}
        ></CustomTabs>
      </div>
      <div className="masters-main-content-body">
        {tabRenderValuePlant[tabValue]}
      </div>
    </section>
  );
}
