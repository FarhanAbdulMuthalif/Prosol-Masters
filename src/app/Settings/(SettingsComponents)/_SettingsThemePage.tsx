import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
import { capitalizeFunc } from "@/utils/capitalizeFunc";
import CheckIcon from "@mui/icons-material/Check";
import { useContext } from "react";

export default function SettingsThemePage() {
  const ContextDataHub = useContext(UseContextHook);

  const { setThemeColor, ThemeColor, colorThemesArr, setReusableSnackBar } =
    ContextDataHub;
  if (!setThemeColor) return null;
  const auth = UseAuth();
  if (!auth || !setReusableSnackBar) {
    return null;
  }
  return (
    <div className="theme-wrapper-div">
      <p className="setting-theme-div-text">Theme Palettes</p>
      <div className="setting-theme-div">
        {colorThemesArr.map((data) => {
          return (
            <div key={data.id} className="settings-container-theme-box-wrapper">
              <section
                className={
                  ThemeColor.name === data.name
                    ? "settings-container-theme-box withBorder-settings-container-theme-box"
                    : "settings-container-theme-box"
                }
                onClick={() => {
                  setThemeColor(data);
                  localStorage.setItem("theme", JSON.stringify(data));
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
                {ThemeColor.name === data.name ? (
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
              <p
                className="settings-container-theme-box-wrapper-text"
                style={{ color: data.primaryColor }}
              >
                {capitalizeFunc(data.name)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
