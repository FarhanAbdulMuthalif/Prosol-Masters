import { UseContextHook } from "@/Provides/UseContextHook";
import ReusableFontSlider from "@/components/Slider/FontSlider";
import OutlineTextField from "@/components/Textfield/OutlineTextfield";
import ReusableToggleButton from "@/components/ToogleButtom.tsx/ToogleButton";
import { ChangeEvent, useContext } from "react";

export default function SettingFontPage() {
  const dataContextHub = useContext(UseContextHook);

  const {
    fontPropertyArr,
    setfontPropertyArr,
    FontsListArr,
    selectedFont,
    setselectedFont,
    ThemeColor,
  } = dataContextHub;

  const options = [
    { type: "normal", label: "Aa" },
    { type: "600", label: "Aa" },
    { type: "bold", label: "Aa" },
  ];
  if (!setfontPropertyArr) return null;
  const handleToggleChange = (value: string, id: number) => {
    setfontPropertyArr((prev) => {
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
    setfontPropertyArr((prev) => {
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
    setfontPropertyArr((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          // Update the defaultSize for the specific font property
          data.defaultSize = Number(value);
        }
        return data;
      });
    });
  };

  if (!setselectedFont) return null;
  function valuetext(value: number) {
    return `${value}px`;
  }
  function valueLabelFormat(value: number) {
    return `${value}px`;
  }
  return (
    <section className="fonts-wrapper-div">
      <div className="font-family-side-wrapper">
        <p className="font-family-side-wrapper-text">Font Family</p>
        <div className="font-family-side">
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
        </div>
      </div>
      <div className="fonts-property">
        <p className="fonts-property-text">Font Property</p>
        {fontPropertyArr.map((data) => (
          <div key={data.name} className="font-propety-content-div">
            <p className="font-propety-content-div-text">{data.name} </p>
            <div className="font-propety-content-font-weight">
              <p className="font-propety-content-weight-text-fnt-wght">
                Font Weight :
              </p>
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
              <p className="font-propety-content-font-size-slider-text">
                Font Size :
              </p>
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
