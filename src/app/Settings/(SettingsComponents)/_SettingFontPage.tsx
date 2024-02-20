import { UseContextHook } from "@/Provides/UseContextHook";
import { useContext } from "react";

export default function SettingFontPage() {
  const UserDataCon = useContext(UseContextHook);
  const { FontsListArr, selectedFont, setselectedFont, ThemeColor } =
    UserDataCon;
  if (!setselectedFont) return null;
  return (
    <>
      <section className="fonts-wrapper-div">
        {FontsListArr.map((data) => (
          <div
            key={data}
            className="single-font-display-div"
            style={
              selectedFont === data
                ? { border: `3px solid ${ThemeColor.primaryColor}` }
                : {}
            }
            onClick={() => {
              setselectedFont(data);
            }}
          >
            <p
              className="single-font-display-text"
              style={{ fontFamily: data }}
            >
              {data}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
