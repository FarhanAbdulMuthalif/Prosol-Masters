"use client";
import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import FillButton from "@/components/Button/FillButton";
import OutlinedButton from "@/components/Button/OutlineButton";
import TextComp from "@/components/TextComp/TextComp";
import { FormEvent, useContext, useState } from "react";
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
  const [tempSelectedFont, setTempSelectedFont] = useState(selectedFont);
  const [tempThemeColor, setTempThemeColor] = useState(ThemeColor);
  const [tempFontPropertyArr, setTempFontPropertyArr] = useState([
    ...fontPropertyArr,
  ]);

  if (!auth || !setThemeColor || !setfontPropertyArr || !setselectedFont) {
    return null;
  }
  const uiSettingsChangeHandler = (e: FormEvent) => {
    e.preventDefault();
    // Apply temporary changes immediately
    setThemeColor(tempThemeColor);
    setfontPropertyArr(tempFontPropertyArr);
    setselectedFont(tempSelectedFont);
    localStorage.setItem("theme", JSON.stringify(tempThemeColor));
    localStorage.setItem("fontProperty", JSON.stringify(tempFontPropertyArr));
    localStorage.setItem("font", JSON.stringify(tempSelectedFont));
  };
  return (
    <form className="settings-wrapper" onSubmit={uiSettingsChangeHandler}>
      <div className="settings-content-header-div">
        <TextComp variant="title">UI Settings</TextComp>
      </div>
      <div className="settings-content-div">
        <SettingsThemePage
          insideSelectedTheme={tempThemeColor}
          setinsideSelectedTheme={setTempThemeColor}
        />
        <SettingFontPage
          insideSelectedFont={tempSelectedFont} // Use tempSelectedFont
          setinsideSelectedFont={setTempSelectedFont} // Update tempSelectedFont
          insideSelectFontProperty={tempFontPropertyArr} // Use tempFontPropertyArr
          setinsideSelectFontProperty={setTempFontPropertyArr} // Update tempFontPropertyArr
        />
        <SettingsFontDisplayText
          insideSelectFontProperty={tempFontPropertyArr}
          insideSelectedFont={tempSelectedFont}
        />
      </div>
      <div className="setting-page-action-div">
        <OutlinedButton>Cancel</OutlinedButton>
        <FillButton type="submit">Apply</FillButton>
      </div>
    </form>
  );
}
