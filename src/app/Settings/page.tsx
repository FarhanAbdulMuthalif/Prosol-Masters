"use client";
import UseAuth from "@/Hooks/useAuth";
import SettingFontPage from "./(SettingsComponents)/_SettingFontPage";
import SettingsFontDisplayText from "./(SettingsComponents)/_SettingsFontDisplayText";
import SettingsThemePage from "./(SettingsComponents)/_SettingsThemePage";
import "./style.scss";

export default function Settings() {
  const auth = UseAuth();

  if (!auth) {
    return null;
  }
  return (
    <main className="settings-wrapper">
      <div className="settings-content-header-div">
        <p className="settings-content-header-div">UI Settings</p>
      </div>
      <div className="settings-content-div">
        <SettingsThemePage />
        <SettingFontPage />
        <SettingsFontDisplayText />
      </div>
    </main>
  );
}
