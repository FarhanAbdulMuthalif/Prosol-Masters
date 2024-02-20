"use client";
import UseAuth from "@/Hooks/useAuth";
import CustomTabs from "@/components/Tabs/Tabs";
import { ReactNode, useState } from "react";
import SettingFontPage from "./(SettingsComponents)/_SettingFontPage";
import SettingsThemePage from "./(SettingsComponents)/_SettingsThemePage";
import "./style.scss";
export default function Settings() {
  const [tabValue, setTabValue] = useState("theme");
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "theme" | "fonts"
  ) => {
    setTabValue(newValue);
  };
  const tabs = [
    { label: `Themes`, value: "theme" },
    { label: `Fonts`, value: "fonts" },
  ];
  const UisettingObj: Record<string, ReactNode> = {
    theme: <SettingsThemePage />,
    fonts: <SettingFontPage />,
  };
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  return (
    <main className="settings-wrapper">
      <div className="settings-content-header-div">
        {" "}
        <CustomTabs
          value={tabValue}
          onChange={handleChange}
          tabs={tabs}
        ></CustomTabs>
      </div>
      <div className="settings-content-div">{UisettingObj[tabValue]}</div>
    </main>
  );
}
