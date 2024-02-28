"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import { useContext, useState } from "react";
import { fontPropertyProps } from "../../../TypesStore";
import SettingFontPage from "./(SettingsComponents)/_SettingFontPage";
import SettingsFontDisplayText from "./(SettingsComponents)/_SettingsFontDisplayText";
import SettingsThemePage from "./(SettingsComponents)/_SettingsThemePage";
import "./style.scss";

export default function Settings() {
  const auth = UseAuth();
  const dataContextHub = useContext(UseContextHook);

  const {
    selectedFont,
    ThemeColor,
    fontPropertyArr,
    setThemeColor,
    setfontPropertyArr,
    setselectedFont,
  } = dataContextHub;
  const [insideSelectedFont, setinsideSelectedFont] = useState(selectedFont);
  const [insideSelectedTheme, setinsideSelectedTheme] = useState(ThemeColor);
  const [insideSelectFontProperty, setinsideSelectFontProperty] = useState<
    fontPropertyProps[]
  >([...fontPropertyArr]);

  if (!auth || !setThemeColor || !setfontPropertyArr || !setselectedFont) {
    return null;
  }
  const uiSettingsChangeHandler = () => {
    setThemeColor(insideSelectedTheme);
    setfontPropertyArr(insideSelectFontProperty);
    setselectedFont(insideSelectedFont);
  };
  return (
    <main className="settings-wrapper">
      <div className="settings-content-header-div">
        <TextComp variant="title">UI Settings</TextComp>
      </div>
      <div className="settings-content-div">
        <SettingsThemePage
          insideSelectedTheme={insideSelectedTheme}
          setinsideSelectedTheme={setinsideSelectedTheme}
        />
        <SettingFontPage
          insideSelectedFont={insideSelectedFont}
          setinsideSelectedFont={setinsideSelectedFont}
          setinsideSelectFontProperty={setinsideSelectFontProperty}
          insideSelectFontProperty={insideSelectFontProperty}
        />
        <SettingsFontDisplayText
          insideSelectFontProperty={insideSelectFontProperty}
          insideSelectedFont={insideSelectedFont}
        />
      </div>
      <div className="setting-page-action-div">
        <OutlinedButton>Cancel</OutlinedButton>
        <FillButton onClick={uiSettingsChangeHandler}>Apply</FillButton>
      </div>
    </main>
  );
}
