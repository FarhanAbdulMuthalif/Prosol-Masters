import UseAuth from "@/Hooks/useAuth";
import { UseContextHook } from "@/Provides/UseContextHook";
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
    <>
      {colorThemesArr.map((data) => {
        return (
          <>
            <div
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
                  // border: ThemeColor.name === data.name ? "2px solid black" : "none",
                }}
              ></div>
              <div
                className={"settings-container-theme-single-box"}
                style={{
                  backgroundColor: data.secondaryColor,
                  // border: ThemeColor.name === data.name ? "2px solid black" : "none",
                }}
              ></div>
              <div
                className={"settings-container-theme-single-box"}
                style={{
                  backgroundColor: data.tertiaryColor,
                  // border: ThemeColor.name === data.name ? "2px solid black" : "none",
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
                    fontSize: "2rem",
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </>
        );
      })}
    </>
  );
}
