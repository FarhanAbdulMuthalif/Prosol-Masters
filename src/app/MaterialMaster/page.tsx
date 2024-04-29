"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import CustomTabs from "@/components/Tabs/Tabs";
import { ReactNode, useContext } from "react";
import CreateMaterialMaster from "./(MaterialMasterActions)/_CreateMaterialMaster";
import MaterialMasterGrid from "./(MaterialMasterActions)/_MaterialMasterGrid";
import "./style.scss";
export default function MaterialMaster() {
  const { tabValue, settabValue } = useContext(UseContextHook);
  const auth = UseAuth();
  if (!settabValue || !tabValue || !auth) return;
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "table" | "create"
  ) => {
    settabValue(newValue);
  };
  const tabs = [
    {
      label: `Material Master View`,
      value: "table",
    },
    {
      label: `Material Master Form`,
      value: "create",
    },
  ];
  const tabObjValue: Record<string, ReactNode> = {
    table: <MaterialMasterGrid />,
    create: <CreateMaterialMaster />,
  };
  return (
    <main className="main-section-material-master">
      <div className="main-section-material-master-header">
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></CustomTabs>
      </div>
      <div className="main-section-material-master-content">
        {tabObjValue[tabValue]}
      </div>
    </main>
  );
}
