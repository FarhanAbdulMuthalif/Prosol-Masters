import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import TextComp from "@/components/TextComp/TextComp";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import CheckIcon from "@mui/icons-material/Check";
import { Dispatch, SetStateAction, useContext } from "react";
import { SingleThemeObjProps } from "../../../../TypesStore";

export default function SettingsThemePage({
  setinsideSelectedTheme,
  insideSelectedTheme,
}: {
  setinsideSelectedTheme: Dispatch<SetStateAction<SingleThemeObjProps>>;
  insideSelectedTheme: SingleThemeObjProps;
}) {
  const ContextDataHub = useContext(UseContextHook);

  const { colorThemesArr } = ContextDataHub;
  const auth = UseAuth();
  if (!auth) {
    return null;
  }
  return (
    <div className="theme-wrapper-div">
      <TextComp variant="subTitle">Theme Palettes</TextComp>

      <div className="setting-theme-div">
        {colorThemesArr.map((data) => {
          return (
            <div key={data.id} className="settings-container-theme-box-wrapper">
              <section
                className={
                  insideSelectedTheme.name === data.name
                    ? "settings-container-theme-box withBorder-settings-container-theme-box"
                    : "settings-container-theme-box"
                }
                onClick={() => {
                  setinsideSelectedTheme(data);
                }}
              >
                <div
                  className={"settings-container-theme-single-box"}
                  style={{
                    backgroundColor: data.primaryColor,
                  }}
                ></div>
                <div
                  className={"settings-container-theme-single-box"}
                  style={{
                    backgroundColor: data.secondaryColor,
                  }}
                ></div>
                <div
                  className={"settings-container-theme-single-box"}
                  style={{
                    backgroundColor: data.tertiaryColor,
                  }}
                ></div>
                {insideSelectedTheme.name === data.name ? (
                  <CheckIcon
                    sx={{
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1rem",
                    }}
                  />
                ) : (
                  ""
                )}
              </section>
              <TextComp
                variant="bodySmall"
                style={{
                  padding: "5px",
                  textAlign: "center",
                  color: data.primaryColor,
                }}
              >
                {capitalizeFunc(data.name)}
              </TextComp>
            </div>
          );
        })}
      </div>
    </div>
  );
}
