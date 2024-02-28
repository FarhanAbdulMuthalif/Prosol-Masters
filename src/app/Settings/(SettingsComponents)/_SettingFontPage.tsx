import { UseContextHook } from "@/Provides/UseContextHook";
import ReusableFontSlider from "@/components/Slider/FontSlider";
import TextComp from "@/components/TextComp/TextComp";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import ReusableToggleButton from "@/components/ToogleButtom.tsx/ToogleButton";
import { PrimaryTextColor } from "@/styles/colorsCode";
import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react";
import { fontPropertyProps } from "../../../../TypesStore";

export default function SettingFontPage({
  setinsideSelectedFont,
  insideSelectedFont,
  insideSelectFontProperty,
  setinsideSelectFontProperty,
}: {
  insideSelectedFont: string;
  setinsideSelectedFont: Dispatch<SetStateAction<string>>;
  insideSelectFontProperty: fontPropertyProps[];
  setinsideSelectFontProperty: Dispatch<SetStateAction<fontPropertyProps[]>>;
}) {
  const dataContextHub = useContext(UseContextHook);

  const { FontsListArr, ThemeColor } = dataContextHub;

  const options = [
    { type: "normal", label: "Aa" },
    { type: "600", label: "Aa" },
    { type: "bold", label: "Aa" },
  ];
  const handleToggleChange = (value: string, id: number) => {
    setinsideSelectFontProperty((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          // Update the font weight for the specific font property
          data.fontWeight = value;
        }
        return data;
      });
    });
    // Perform additional logic if needed
  };
  const handleSliderChange = (
    event: Event,
    value: number | number[],
    id: number
  ) => {
    // console.log(value, id);
    setinsideSelectFontProperty((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          // Update the defaultSize for the specific font property
          data.defaultSize = Number(value);
        }
        return data;
      });
    });
    // Perform additional logic if needed
  };
  const handlePixelInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = e.target;
    setinsideSelectFontProperty((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          // Update the defaultSize for the specific font property
          data.defaultSize = Number(value);
        }
        return data;
      });
    });
  };

  function valuetext(value: number) {
    return `${value}px`;
  }
  function valueLabelFormat(value: number) {
    return `${value}px`;
  }
  return (
    <section className="fonts-wrapper-div">
      <div className="font-family-side-wrapper">
        <TextComp variant="subTitle">Font Family</TextComp>

        <div className="font-family-side">
          {FontsListArr.map((data) => (
            <div
              key={data}
              className="single-font-display-div"
              style={
                insideSelectedFont === data
                  ? { border: `3px solid ${ThemeColor.primaryColor}` }
                  : {}
              }
              onClick={() => {
                setinsideSelectedFont(data);
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
        </div>
      </div>

      <div className="fonts-property">
        <TextComp variant="subTitle">Font Propertry</TextComp>

        {insideSelectFontProperty.map((data) => (
          <div key={data.name} className="font-propety-content-div">
            <TextComp
              variant="bodySmall"
              style={{
                flex: 1,
                color: PrimaryTextColor,
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              {data.name}
            </TextComp>
            {/* <p className="font-propety-content-div-text">{data.name} </p> */}
            <div className="font-propety-content-font-weight">
              <TextComp variant="bodySmall" style={{ fontWeight: "bold" }}>
                Font Weight :
              </TextComp>

              <div className="font-propety-content-weight-text">
                {/* <p className=" fnt-cnt-regular">Aa</p>
                <p className="fnt-cnt-medium">Aa</p>
                <p className="fnt-cnt-bold">Aa</p> */}
                <ReusableToggleButton
                  value={data.fontWeight}
                  onChange={handleToggleChange}
                  options={options}
                  id={data.id}
                />
              </div>
            </div>
            <div className="font-propety-content-font-size-slider">
              <TextComp variant="bodySmall" style={{ fontWeight: "bold" }}>
                Font Size :
              </TextComp>
              <ReusableFontSlider
                value={data.defaultSize}
                onChange={handleSliderChange}
                idRecord={data.id}
                min={10}
                max={16}
                step={2}
                sx={{ width: "100px" }}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                marks
                size="small"
              />
            </div>
            <div className="font-propety-content-font-size-decimal">
              <OutlineTextField
                placeholder="Fontsize"
                value={data.defaultSize}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handlePixelInputChange(e, data.id);
                }}
                type="number"
                InputProps={{
                  endAdornment: (
                    <p style={{ fontSize: "10px", paddingRight: "5px" }}>px</p>
                  ),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
