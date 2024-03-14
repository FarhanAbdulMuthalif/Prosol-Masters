"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import CustomTabs from "@/components/Tabs/Tabs";
import { ReactNode, useContext } from "react";
import CreateDynamicForm from "./(DynamicComponents)/_CreateDynamicForm";
import DynamicFormGrid from "./(DynamicComponents)/_DynamicFormGrid";
import "./style.scss";

export default function Dynamic() {
  const contextDataHub = useContext(UseContextHook);
  const { settabValue, tabValue } = contextDataHub;
  const auth = UseAuth();
  if (!tabValue || !settabValue || !auth) {
    return null;
  }
  const tabs = [
    { label: `Dynamic Form View`, value: "table" },
    {
      label: `Create Dynamic Form`,
      value: "create",
    },
  ];
  const tabRenderValueDynamic: Record<string, ReactNode> = {
    table: <DynamicFormGrid />,
    create: <CreateDynamicForm />,
  };
  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "table" | "edit" | "create"
  ) => {
    settabValue(newValue);
  };
  return (
    <main className="main-section-dynamic-page">
      <div className="main-section-dynamic-page-header">
        <CustomTabs
          value={tabValue}
          onChange={handleTabChange}
          tabs={tabs}
        ></CustomTabs>
      </div>
      <div className="main-section-dynamic-page-body">
        {tabRenderValueDynamic[tabValue]}
      </div>
    </main>
  );
}
